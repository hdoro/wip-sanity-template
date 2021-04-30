import React from 'react'
import { SanityImage } from '../../types/objects'
import getClass from '../../styles/getClass'
import getImageProps from './getImageProps'

const LazyImage: React.FC<{
  image: SanityImage
  maxWidth?: number
  sizes?: string
  alt?: string
  className?: string
}> = ({ image, alt, maxWidth, sizes, className }) => {
  if (!image?.asset?._ref) {
    return null
  }
  const altText = alt || image.alt
  const imgProps = getImageProps({
    image,
    maxWidth,
    sizes,
  })
  if (!imgProps?.src || !imgProps?.aspectRatio) {
    return null
  }
  return (
    <div
      className={getClass('lazy-img', className)}
      // These data attributes will be used by scripts/image-loading.ts to load the images outside of React
      // This way we can have lazy-loaded images in Next pages using unstable_runtimeJS: false
      data-alt={altText}
      data-src={imgProps.src}
      data-srcset={imgProps.srcset}
      data-webpsrcset={imgProps.webpsrcset}
      data-sizes={imgProps.sizes}
      style={
        {
          '--img-ratio': imgProps.aspectRatio,
        } as any
      }
    >
      {/* Spacer div that keeps the container height according to the image before it loads to avoid layout shifts */}
      <div
        style={{
          width: '100%',
          paddingBottom: `${100 / imgProps.aspectRatio}%`,
        }}
        aria-hidden="true"
        className="lazy-img__spacer"
      />

      {/* Div that image-loading.ts will use to place the final image */}
      <div className="lazy-img__container" />

      <noscript>
        <img
          srcSet={imgProps.srcset}
          src={imgProps.src}
          alt={altText || ''}
          sizes={imgProps.sizes}
        />
      </noscript>
    </div>
  )
}

export default LazyImage
