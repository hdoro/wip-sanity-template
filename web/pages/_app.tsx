import React from 'react'
import type { AppProps } from 'next/app'
import BaseHead from '../components/Head/BaseHead'

const AppWrapper: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <BaseHead />
      <Component {...pageProps} />
    </>
  )
}

export default AppWrapper
