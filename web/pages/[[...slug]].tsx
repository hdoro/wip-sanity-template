import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Page, { PageData } from '../components/Page/Page'
import client from '../utils/client'
import { PAGE_PROJECTION, SETTINGS_PROJECTION } from '../utils/queries'
import { getPathFromSlug } from '../utils/urls'
import getPagePaths from '../utils/getPagePaths'

const PageRoute: NextPage<PageData> = (props) => {
  return <Page {...props} />
}

export default PageRoute

export const getStaticProps: GetStaticProps = async (context) => {
  const slug: string | undefined = context.params?.slug
    ? Array.isArray(context.params.slug)
      ? context.params.slug.join('/')
      : context.params.slug
    : undefined
  let pageQuery

  // Homepages won't receive a params.slug
  if (typeof slug !== 'string') {
    pageQuery = /* groq */ `*[_id == $settingsId]{
      homepage->{
        ${PAGE_PROJECTION}
      }
    }.homepage[0]`
  } else {
    pageQuery = /* groq */ `*[
        _type == 'site.page' &&
        slug.current == $slug &&
        !(_id in path("drafts.**")) &&
        publishStatus in ["hidden", "public"]
      ][0]{
        ${PAGE_PROJECTION}
      }`
  }
  const data = await client.fetch<PageData>(
    /* groq */ `{
    "settings": *[_id == $settingsId][0]{
      ${SETTINGS_PROJECTION}
    },
    "page": ${pageQuery}
  }`,
    {
      settingsId: 'settings',
      slug: slug || '',
    },
  )

  if (!data?.page?._id) {
    return {
      notFound: true,
      // As it could be the case that we opened this path before publishing the document or setting its publishStatus !== "unpublished", let's revalidate it in 15 minutes
      revalidate: 60 * 15, // 15 minutes
    }
  }

  // For regular paths (non-root/home), if the page document is a homepage (see PAGE_PROJECTION), then redirect to root path
  if (typeof slug === 'string' && data.page?.isHomepage === true) {
    return {
      redirect: {
        destination: getPathFromSlug('/'),
        permanent: true,
      },
    }
  }

  return {
    props: data,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPagePaths(true)
  return {
    paths,
    fallback: 'blocking',
  }
}

// BONUS FOR PERFORMANCE:
// If your page doesn't use any interactive components, you can remove JS from it entirely. Simply uncomment below:

// export const config = {
//   unstable_runtimeJS: false,
// }
