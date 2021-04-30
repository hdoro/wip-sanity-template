import {
  CtaLink,
  CustomScript,
  PageHeroData,
  SanityBlockContent,
  SanityImage,
} from './objects'

interface BaseSanityDoc {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: string
}

export type LocaleT = 'en' | 'no'

export interface AltLocale {
  locale: LocaleT
  slug: string
}

export type PublishStatusT = 'private' | 'hidden' | 'published'

export interface PageDoc extends BaseSanityDoc {
  locale?: LocaleT
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  scripts?: CustomScript[]
  hero?: PageHeroData
  body?: SanityBlockContent
  includeNewsletter?: boolean
}

export interface PageInRoute {
  page: PageDoc
  priority?: number
  identifier?: string
}

export interface RouteDoc extends BaseSanityDoc {
  isHomepage?: boolean
  publishStatus?: PublishStatusT
  slug?: SanitySlug
  pages?: PageInRoute[]
  optimizeExperimentId?: string
}

export interface NewsletterData {
  title?: string
  subtitle?: string
  label?: string
  invalidError?: string
  successMsg?: string
}

export interface SettingsDoc extends BaseSanityDoc {
  scripts?: CustomScript[]
  headerLinks?: CtaLink[]
  footerLinks?: CtaLink[]
  newsletter?: NewsletterData
  defaultOgImage?: SanityImage
  // Exclusive to 404.tsx
  notFound?: PageDoc
}
