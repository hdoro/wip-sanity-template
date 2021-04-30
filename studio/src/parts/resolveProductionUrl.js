import getPreviewUrl from '../utils/getPreviewUrl'

/**
 * Defines which URL to show in the preview menu for documents. If returns undefined, no preview button will show up in the
 */
export default function resolveProductionUrl(document) {
  return getPreviewUrl(document)
}
