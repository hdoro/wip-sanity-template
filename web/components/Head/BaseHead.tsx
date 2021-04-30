import React from 'react'
import Head from 'next/head'
import { THEME_COLOR, SITE_NAME, TWITTER_HANDLE } from '../../../shared/config'

const BaseHead: React.FC = () => {
  return (
    <Head>
      {/* Unmmutable OpenGraph info */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image"></meta>

      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}

      {/* Resolving Sanity's CDN DNS to speed up image loading */}
      <link rel="preconnect dns-prefetch" href="https://cdn.sanity.io"></link>

      {/* Mobile theming */}
      <meta name="msapplication-TileColor" content={THEME_COLOR} />
      <meta name="theme-color" content={THEME_COLOR} />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicons/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicons/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicons/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <meta
        name="msapplication-TileImage"
        content="/favicons/mstile-150x150.png"
      />
    </Head>
  )
}

export default BaseHead
