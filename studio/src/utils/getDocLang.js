import locales from '../../../shared/locales'

export default function getDocLang(document) {
  return document?.__i18n_lang || locales[0]
}
