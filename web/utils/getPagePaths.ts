import { ParsedUrlQuery } from 'querystring'
import client from './client'

/**
 * Returns paths that should be indexed by SEs or built on the server by Next.
 * @param includeHidden Whether or not pages with publishStatus === hidden should show up. Makes sense to include them in the context of [[...slug]]'s getStaticPaths, but not in generate-sitemap's
 */
async function getPagePaths(
  includeHidden?: boolean,
): Promise<{ params: ParsedUrlQuery; locale?: string }[]> {
  try {
    const { pages, homepageIds, notFoundIds } = await client.fetch<{
      pages: {
        _id: string
        slug: string
        locale: string
      }[]
      homepageIds: string[]
      notFoundIds: string[]
    }>(/* groq */ `{
      "pages": *[
        _type == "site.page" &&
        // We definitely don't want unpublished pages, but depending on the context we may want hidden ones, too
        publishStatus in ["public"${includeHidden ? ', "hidden"' : ''}] &&
        defined(slug.current) &&
        !(_id in path("drafts.**"))
      ] {
        _id,
        "slug": slug.current,
      },
      "homepageIds": *[
        _type == "site.settings" &&
        !(_id in path("drafts.**"))
      ].homepage._ref,
      "notFoundIds": *[
        _type == "site.settings" &&
        !(_id in path("drafts.**"))
      ].notFound._ref,
    }`)

    // Let's remove homepages from the list of paths as these are included statically below
    // 404s won't even be added are they aren't worth indexing/building
    const regularPages = pages.filter(
      (page) =>
        !homepageIds.includes(page._id) && !notFoundIds.includes(page._id),
    )

    return [
      {
        // Homepage
        params: {
          slug: null,
        },
      },
      ...regularPages.map((page) => ({
        params: {
          slug: page.slug.split('/'),
        },
      })),
    ]
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getPagePaths
