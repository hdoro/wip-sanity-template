import { SanityDocument } from '@sanity/client'
import React from 'react'

// Stub for page component
export interface PageData {
  page: SanityDocument
  config: SanityDocument
}

const Page: React.FC<PageData> = ({ page, config }) => {
  console.log({ page, config })
  return <h1>{page.title || 'Untitled page'}</h1>
}

export default Page
