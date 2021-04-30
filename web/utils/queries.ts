const LINK_PROJECTION = /* groq */ `
_key,
url,
label,
newWindow,
conversionId,
"linkedPage": pageLink->{
  "locale": __i18n_lang,
  slug,
},
`

const BODY_PROJECTION = /* groq */ `
...,
markDefs[] {
  ...,
  ${LINK_PROJECTION}
},
body[] {
  ...,
  markDefs[] {
    ...,
    ${LINK_PROJECTION}
  },
},
items[] {
  ...,
  body[] {
    ...,
    markDefs[] {
      ...,
      ${LINK_PROJECTION}
    },
  },
  ${LINK_PROJECTION}
},
structure->{
  items,
},
ctas[] {
  ...,
  ${LINK_PROJECTION}
},
`

export const SETTINGS_PROJECTION = /* groq */ `
scripts,
headerLinks[]{
  ${LINK_PROJECTION}
},
footerLinks[]{
  ${LINK_PROJECTION}
},
newsletter,
`

export const PAGE_PROJECTION = /* groq */ `
_id,
"locale": __i18n_lang,
seoTitle,
seoDescription,
ogImage,
includeNewsletter,
hero {
  ...,
  body[]{
    ${BODY_PROJECTION}
  },
  ctas[] {
    ...,
    ${LINK_PROJECTION}
  },
},
body[]{
  ${BODY_PROJECTION}
},
`

export const ROUTE_PROJECTION = /* groq */ `
_id,
publishStatus,
slug,
pages[]{
  page->{
    ${PAGE_PROJECTION}
  },
  priority,
  identifier,
},
"isHomepage": _id == *[
  _type == "settings" &&
  !(_id in path("drafts.**")) &&
  __i18n_lang == ^.__i18n_lang
][0].homeRoute._ref,
`
