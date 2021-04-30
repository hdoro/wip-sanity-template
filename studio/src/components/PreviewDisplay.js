import React from 'react'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'

import resolveProductionUrl from '../parts/resolveProductionUrl'
import styles from './PreviewDisplay.module.css'

const ErrorDisplay = () => {
  return (
    <div className={styles.errorContainer}>
      <p>Fill all the required fields before accessing the preview</p>
    </div>
  )
}

const PreviewDisplay = ({ document, isMobile }) => {
  const displayed = document?.displayed || {}
  const url = resolveProductionUrl(displayed)

  if (!url) {
    return <ErrorDisplay />
  }

  return (
    <div className={styles.iframeContainer}>
      {isMobile ? (
        <SanityMobilePreview>
          <div className={styles.iframeContainer}>
            <iframe src={url} frameBorder={'0'} />
          </div>
        </SanityMobilePreview>
      ) : (
        <iframe src={url} frameBorder={'0'} />
      )}
    </div>
  )
}

export const WebPreview = ({ document }) => {
  return <PreviewDisplay document={document} />
}

export const MobilePreview = ({ document }) => {
  return <PreviewDisplay document={document} isMobile={true} />
}
