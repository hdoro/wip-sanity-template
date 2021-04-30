import { ParsedUrlQuery } from 'querystring'
import locales from '../../shared/locales'
import { LocaleT } from '../types/documents'
import client from './client'

/**
 * Returns paths that should be indexed by SEs or built on the server by Next.
 *
 * @param includeHidden Whether or not pages with publishStatus === hidden should show up. Makes sense to include them in the context of [[...slug]]'s getStaticPaths, but not in generate-sitemap's
 */
async function getRoutePaths(
  includeHidden?: boolean,
): Promise<{ params: ParsedUrlQuery; locale?: string }[]> {
  try {
    const { routes, homepageIds, notFoundIds } = await client.fetch<{
      routes: {
        _id: string
        slug: string
        locale: string
      }[]
      homepageIds: string[]
      notFoundIds: string[]
    }>(/* groq */ `{
      "routes": *[
        _type == "page" &&
        // We definitely don't want unpublished routes, but depending on the context we may want hidden ones, too
        publishStatus in ["public"${includeHidden ? ', "hidden"' : ''}] &&
        defined(slug.current) &&
        defined(__i18n_lang) &&
        !(_id in path("drafts.**"))
      ] {
        _id,
        "slug": slug.current,
        "locale": __i18n_lang,
      },
      "homepageIds": *[
        _type == "settings" &&
        !(_id in path("drafts.**"))
      ].homeRoute._ref,
      "notFoundIds": *[
        _type == "settings" &&
        !(_id in path("drafts.**"))
      ].notFound._ref,
    }`)

    // Let's remove homepages from the list of paths as these are included statically below
    // 404s won't even be added are they aren't worth indexing/building
    const regularRoutes = routes.filter(
      (page) =>
        !homepageIds.includes(page._id) && !notFoundIds.includes(page._id),
    )

    return [
      ...locales.map((locale: LocaleT) => ({
        params: {
          slug: null,
        },
        locale,
      })),
      ...regularRoutes.map((route) => ({
        params: {
          slug: route.slug.split('/'),
        },
        locale: route.locale,
      })),
    ]
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getRoutePaths
