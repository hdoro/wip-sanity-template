import React from 'react'

import { ImageBlockData } from '../../types/objects'
import LazyImage from '../LazyImage/LazyImage'

const SIZE_MAPPING = {
  sm: {
    maxWidth: 640,
  },
  md: {
    maxWidth: 850,
  },
  lg: {
    maxWidth: 1120,
  },
}

const ImageBlock: React.FC<ImageBlockData> = ({
  image,
  caption,
  alt,
  size,
}) => {
  if (!image?.asset?._ref) {
    return null
  }
  const { maxWidth } = SIZE_MAPPING[size] || SIZE_MAPPING.md

  return (
    <figure data-layout={size}>
      <LazyImage maxWidth={maxWidth} image={image} alt={alt || caption} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default ImageBlock
