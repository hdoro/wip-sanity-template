import React from 'react'
import { SanityImage } from '../../types/objects'
import getImageProps from './getImageProps'

/**
 * Contrary to LazyImage, this one loads onload. Used only in the PageHero
 */
const EagerImage: React.FC<{
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
    <img
      srcSet={imgProps.webpsrcset}
      src={imgProps.src}
      alt={altText || ''}
      sizes={imgProps.sizes}
      className={className}
    />
  )
}

export default EagerImage
