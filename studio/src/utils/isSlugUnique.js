import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({
  apiVersion: '2021-03-25',
})

import getDocLang from './getDocLang'

/**
 * Tests whether or not the slug is unique across the current language
 */
function isSlugUnique(slug, options) {
  const { document } = options

  const lang = getDocLang(document)
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    lang,
  }

  // Returns a boolean, which Sanity will use to determine whether or not allow publishing of the page
  // (if true, another doc of the same language has the same slug, so prevent publishing)
  const query = /* groq */ `!defined(*[
    _type == "page" &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    __i18n_lang == $lang
  ][0]._id)`

  return client.fetch(query, params)
}

export default isSlugUnique
