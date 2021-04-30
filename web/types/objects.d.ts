import { LocaleT } from './documents'

/**
 * You'll notice every type has every property as optional, that's intentional.
 * As content comes from the editor data and Sanity still doesn't offer back-end validation features, we want to be as defensive as possible.
 */

// Due to volatile nature of BlockContent/Portable Text, there's no value in typing this..
export type SanityBlockContent = any[]

export interface SanitySlug {
  _type?: 'slug'
  current?: string
}

export interface SanityImage {
  _type?: 'image'
  alt?: string
  caption?: string
  asset: {
    _type: 'reference'
    _ref: string
    metadata?: {
      lqip?: string
    }
  }
}

export interface CustomScript {
  script?: string
  type?: 'headEnd' | 'bodyStart' | 'bodyEnd'
}

export interface CtaLink {
  _key?: string
  conversionId?: string
  // Exclusive to page links
  linkedPage?: {
    locale?: LocaleT
    slug?: SanitySlug
  }
  // Exclusive to absolute URL CTAs
  url?: string
  newWindow?: boolean
  label?: string
  // Used in Footer & header for hrefLang links
  isLocaleLink?: boolean
}

export type CtaType = 'primary' | 'secondary' | 'tertiary' | 'inline' | 'nav'

export type PageHeroLayoutsT = 'image-right' | '1-column-center'

export interface PageHeroData {
  title?: string
  image?: SanityImage
  body?: SanityBlockContent
  ctas?: CtaLink[]
  layout?: PageHeroLayoutsT
}

interface BaseBlock {
  _key: string
  hideBlock?: boolean
}

interface TitledBlock extends BaseBlock {
  title?: string
}

interface SuptitledBlock extends TitledBlock {
  suptitle?: string
}

export interface AnchorData {
  anchorId?: string
}

export interface CtaSectionData extends SuptitledBlock {
  ctas?: CtaLink[]
}

export interface ClientLogoSectionData extends TitledBlock {
  items?: {
    image?: SanityImage
    name?: string
  }[]
}

interface BlurbData extends TitledBlock {
  image?: SanityImage
  body?: SanityBlockContent
}

export type BlurbLayoutsT = '3-columns' | 'side-image'

export interface BlurbSectionData extends SuptitledBlock {
  items?: BlurbData[]
  layout?: BlurbLayoutsT
}

export type ImageSizeT = 'sm' | 'md' | 'lg'

export interface ImageBlockData extends BaseBlock {
  image?: SanityImage
  caption?: string
  alt?: string
  size?: ImageSizeT
}

export interface IframeData extends BaseBlock {
  code?: string
}

export interface PricingPlanData extends TitledBlock {
  price?: string
  features?: string[]
  cta?: CtaLink
}

export interface PricingTableData extends SuptitledBlock {
  structure?: {
    items?: PricingPlanData[]
  }
}

export interface TestimonialData extends BaseBlock {
  body?: SanityBlockContent
  name?: string
  role?: string
  image?: SanityImage
}

// PLOP: new block type definition

export interface VersionedScreenshotData extends BaseBlock {
  customField?: string
}
        

export interface NewsletterBlockData extends TitledBlock {
  subtitle?: string
}
