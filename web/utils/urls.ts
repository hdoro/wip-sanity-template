import { BASE_URL } from '../../shared/config'
import locales from '../../shared/locales'
import { LocaleT } from '../types/documents'

export function removeDoubleSlashes(path: string): string {
  return path.replace(/\/{2,}/g, '/')
}

export function getPathFromSlug(slug: string, locale?: LocaleT): string {
  let finalSlug = slug
  if (locale && locale !== locales[0]) {
    finalSlug = `${locale}/${slug}`
  }
  return removeDoubleSlashes(`/${finalSlug}/`)
}

export function slugToAbsUrl(slug: string, locale?: LocaleT): string {
  return BASE_URL + getPathFromSlug(slug, locale)
}
