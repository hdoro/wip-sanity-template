import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import CtaRow from '../components/Ctas/CtaRow'
import Page from '../components/Page/Page'
import { LocaleT, SettingsDoc } from '../types/documents'
import client from '../utils/client'
import { PAGE_PROJECTION, SETTINGS_PROJECTION } from '../utils/queries'

interface NotFoundProps {
  settings: SettingsDoc
}

const NotFound: NextPage<NotFoundProps> = ({ settings }) => {
  const router = useRouter()
  const locale = router.locale as LocaleT
  if (!settings?.notFound?._id) {
    return (
      <main>
        <h1>Not found</h1>
        <CtaRow
          ctas={[
            {
              label: 'Go to homepage',
              linkedPage: {
                locale: locale,
                slug: {
                  current: '',
                },
              },
            },
          ]}
        />
      </main>
    )
  }
  return (
    <Page
      settings={settings}
      page={settings.notFound}
      analyticsIdentifier="notfound-404"
      publishStatus="hidden"
    />
  )
}

export default NotFound

export const getStaticProps: GetStaticProps = async (context) => {
  const isDefaultLocale = context.locale === context.defaultLocale

  const data = await client.fetch<NotFoundProps>(
    /* groq */ `{
    "settings": *[_id == $settingsId][0]{
      ${SETTINGS_PROJECTION}
      "notFound": notFound->{
        ${PAGE_PROJECTION}
      }
    },
  }`,
    {
      settingsId: isDefaultLocale
        ? 'settings'
        : `i18n.settings.${context.locale}`,
    },
  )

  return {
    props: {
      ...data,
    },
  }
}
