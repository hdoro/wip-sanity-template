import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import htmlParser from 'html-react-parser'

import { CustomScript, SanityImage } from '../../types/objects'
import { imageBuilder } from '../../utils/client'
import { AltLocale, LocaleT, PublishStatusT } from '../../types/documents'
import { slugToAbsUrl } from '../../utils/urls'
import JsonLd from './JsonLD'
import { BASE_URL, SITE_NAME, TWITTER_HANDLE } from '../../../shared/config'

const DynamicHead: React.FC<{
  title?: string
  description?: string
  ogImage?: SanityImage
  defaultOgImage?: SanityImage
  locale?: LocaleT
  alternateLocales?: AltLocale[]
  publishStatus?: PublishStatusT
  customScripts?: CustomScript[]
  isHomepage?: boolean
}> = ({
  title = SITE_NAME,
  description,
  ogImage,
  locale,
  alternateLocales = [],
  publishStatus = 'hidden',
  customScripts = [],
  isHomepage = false,
}) => {
  const router = useRouter()
  const canonicalUrl = slugToAbsUrl(router?.pathname || router?.asPath)

  const headScripts = customScripts
    .filter((script) => script.type === 'headEnd')
    .reduce(
      (finalScript, curEntry) => `${finalScript}\n\n${curEntry.script || ''}`,
      '',
    )
  return (
    <>
      <Head>
        {publishStatus === 'published' ? (
          <link rel="canonical" href={canonicalUrl} />
        ) : (
          <meta name="robots" content="noindex nofollow" />
        )}

        <title>{title}</title>
        <meta name="og:title" property="og:title" content={title} />
        {description && (
          <meta
            name="description"
            property="description"
            content={description}
          />
        )}

        {locale && (
          <meta name="og:locale" property="og:locale" content={locale} />
        )}

        {alternateLocales.map((alt) => (
          <React.Fragment key={alt.locale}>
            <link
              rel="alternate"
              hrefLang={alt.locale}
              href={slugToAbsUrl(alt.slug, alt.locale)}
            />
            {alt.locale !== locale && (
              <meta
                name="og:locale:alternate"
                property="og:locale:alternate"
                content={alt.locale}
              />
            )}
          </React.Fragment>
        ))}

        {ogImage && (
          <>
            {/* Recommended 1200x630 size for FB, Twitter & Linkedin */}
            <meta
              name="og:image"
              property="og:image"
              content={imageBuilder
                .image(ogImage)
                .width(1200)
                .height(630)
                .fit('fillmax')
                .crop('center')
                // We reduce the quality here to make sure the image file has a size small enough to comply with networks' recommendations
                .quality(95)
                .url()}
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Recommended 256x256px size for WhatsApp */}
            <meta
              name="og:image"
              property="og:image"
              content={imageBuilder
                .image(ogImage)
                .width(256)
                .height(256)
                .fit('fillmax')
                .crop('center')
                // WhatsApp is especially picky about the size of the images (they won't show anything above 300kb), so we need to reduce it a bit more
                .quality(90)
                .url()}
            />
            <meta property="og:image:width" content="256" />
            <meta property="og:image:height" content="256" />
          </>
        )}

        {/* As we can't do dangerouslySetInnerHtml in <Head> elements, we're using the htmlParser package to create React nodes out of our scripts string */}
        {htmlParser(headScripts)}
      </Head>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': isHomepage ? 'Organization' : 'WebPage',
          '@id': canonicalUrl,
          url: canonicalUrl,
          inLanguage: locale,
          name: isHomepage ? SITE_NAME : undefined,
          logo: isHomepage
            ? `${BASE_URL}/favicons/android-chrome-256x256.png`
            : undefined,
          headline: !isHomepage ? title : undefined,
          description: !isHomepage ? description : undefined,
          image:
            !isHomepage && ogImage?.asset?._ref
              ? imageBuilder.image(ogImage).maxWidth(1000).url()
              : undefined,
          creator: !isHomepage
            ? {
                '@type': 'Organization',
                url: slugToAbsUrl('', locale),
              }
            : undefined,
          sameAs: TWITTER_HANDLE && [`https://twitter.com/${TWITTER_HANDLE}`],
        }}
      />
    </>
  )
}

export default DynamicHead
