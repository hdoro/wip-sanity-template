import Head from 'next/head'
import React from 'react'

const JsonLd: React.FC<{
  data: {
    [key: string]: any
  }
}> = ({ data = {} }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      ></script>
    </Head>
  )
}

export default JsonLd
