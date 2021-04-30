import { BASE_URL } from '../../../shared/config'
import getDocLang from './getDocLang'

/**
 * Takes a Sanity document and returns a URL for previewing it in the front-end.
 */
export default function getPreviewUrl(document) {
  if (!document?._type) {
    return
  }
  if (document._type === 'page' && document.slug?.current) {
    return `${BASE_URL}/preview?id=${document._id}&locale=${getDocLang(
      document,
    )}`
  }
}
