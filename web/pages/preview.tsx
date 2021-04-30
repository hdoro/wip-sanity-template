import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Page, { PageData } from '../components/Page/Page'
import PreviewError from '../components/Preview/PreviewError'
import PreviewLoading from '../components/Preview/PreviewLoading'
import PreviewRefresh from '../components/Preview/PreviewRefresh'
import { browserClient } from '../utils/client'
import { SETTINGS_PROJECTION, PAGE_PROJECTION } from '../utils/queries'

const Preview: React.FC = () => {
  const router = useRouter()
  const [state, setState] = React.useState<{
    status: 'loading' | 'idle' | 'error'
    data?: undefined | PageData
    error?: {
      title?: string
      subtitle?: string
    }
  }>({
    status: 'loading',
  })

  async function getData({ id, locale }: { id: string; locale: string }) {
    setState({
      ...state,
      status: 'loading',
    })
    const query = /* groq */ `{
      "settings": *[_id == $settingsId][0]{
        ${SETTINGS_PROJECTION}
      },
      "page": *[_id == $pageId][0]{
        ${PAGE_PROJECTION}
      }
    }`
    const isDefaultLocale = locale === router.defaultLocale
    const data = await browserClient.fetch<PageData>(query, {
      settingsId: isDefaultLocale ? 'settings' : `i18n.settings.${locale}`,
      pageId: id,
    })
    if (!data?.page?._id) {
      setState({
        status: 'error',
        error: {
          title: "Couldn't find a page with this id",
          subtitle:
            "If you were previewing a draft and just published it, the draft is no more, so that may be why we couldn't find the page.",
        },
      })
      return
    }
    setState({
      status: 'idle',
      data,
    })
  }

  function parseQuery() {
    const { id, locale } = router.query
    if (typeof id !== 'string') {
      setState({
        status: 'error',
        error: {
          title: 'No document chosen',
          subtitle:
            'Make sure you open this page from the preview menu in the CMS.',
        },
      })
      return
    }
    if (typeof locale !== 'string') {
      setState({
        status: 'error',
        error: {
          title: 'No language/locale chosen',
          subtitle:
            'Make sure you open this page from the preview menu in the CMS.',
        },
      })
      return
    }
    // If we have what's necessary to fetch the page, getData
    getData({ id, locale })
  }

  React.useEffect(() => {
    parseQuery()
  }, [router.query])

  if (state.data?.page?._id) {
    return (
      <>
        {state.status === 'loading' && <PreviewLoading />}
        <PreviewRefresh onClick={() => parseQuery()} />
        <Page {...state.data} />
      </>
    )
  }

  if (state.status === 'loading') {
    return <PreviewLoading />
  }

  // If we're in idle state without data or in error state, show error
  return <PreviewError {...(state.error || {})} />
}

/**
 * No matter the stage of the preview, this Wrapper prevents SEs from indexing this content with the meta tag below.
 * */
const PreviewWrapper: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Preview />
    </>
  )
}

export default PreviewWrapper
