import { ImageFormat } from '@sanity/image-url/lib/types/types'
import { SanityImage } from '../../types/objects'
import { imageBuilder } from '../../utils/client'

const DEFAULT_MAX_WIDTH = 1200
const MINIMUM_WIDTH = 100
const WIDTH_STEPS = 200
const MAX_MULTIPLIER = 3

// @TODO: upgrade this function to my latest iteration (auto format)
function getImageProps(props: {
  image?: SanityImage
  maxWidth?: number
  sizes?: string
}):
  | {
      src: string
      aspectRatio: number
      srcset?: string
      webpsrcset?: string
      sizes?: string
    }
  | undefined {
  const { image } = props
  if (!image?.asset?._ref) {
    return
  }

  // example asset._ref:
  // image-7558c4a4d73dac0398c18b7fa2c69825882e6210-366x96-png
  // When splitting by '-' we can extract the dimensions and format
  const [, , dimensions, format] = image.asset._ref.split('-')

  // Dimensions come as 366x96 (widthXheight), so we split it into an array and
  // transform each entry into actual numbers instead of strings
  const [srcWidth, srcHeight] = dimensions
    .split('x')
    .map((num) => parseInt(num, 10))
  const aspectRatio = srcWidth / srcHeight

  // We want to preserve SVGs as they're usually the most compact and lossless format, so if the original image is an svg return only its src and the component won't have a srcset
  if (format === 'svg') {
    return {
      src: imageBuilder.image(image).url(),
      aspectRatio,
    }
  }

  // We can either set a custom `sizes` property or consider the maximum size
  // of containers, which is 1200px for this project. We're not going to have
  // fullscreen images, so the maximum size they'll have is that of the
  // container, unless specified otherwise
  const maxWidth = props.maxWidth || DEFAULT_MAX_WIDTH
  const finalSizes =
    props.sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`

  let srcset = ''
  let webpsrcset = ''

  // total number of variations is based on the number of steps
  // we need to go from minimum width to maxWidth * 3 (retina)
  // Minimum number of variations is 3, hence Math.max
  const totalVariations = Math.max(
    Math.ceil((maxWidth * MAX_MULTIPLIER - MINIMUM_WIDTH) / WIDTH_STEPS),
    3,
  )

  // Get the middle variation and use it as the default width
  const defaultWidth =
    MINIMUM_WIDTH + Math.floor(totalVariations / 2) * WIDTH_STEPS
  // Which is going to be used as the default src
  const src = imageBuilder
    .image(image)
    // webp is not suitable to being the default src as it isn't supported in every browser, so we default to jpg if that's the case
    .format(format === 'webp' ? 'jpg' : (format as ImageFormat))
    .width(defaultWidth)
    .fit('max')
    .url()

  for (let i = 0; i < totalVariations; i++) {
    const currWidth = MINIMUM_WIDTH + WIDTH_STEPS * i

    // Add this width to both srcsets (webp and non-webp)
    srcset = `${srcset ? `${srcset},` : ''} ${imageBuilder
      .image(image)
      .format(format === 'webp' ? 'jpg' : (format as ImageFormat))
      .width(currWidth)
      .fit('max')
      .url()} ${currWidth}w`
    webpsrcset = `${webpsrcset ? `${webpsrcset},` : ''} ${imageBuilder
      .image(image)
      .format('webp')
      .width(currWidth)
      .fit('max')
      .url()} ${currWidth}w`
  }

  return {
    src,
    sizes: finalSizes,
    aspectRatio,
    webpsrcset,
    srcset,
  }
}

export default getImageProps
