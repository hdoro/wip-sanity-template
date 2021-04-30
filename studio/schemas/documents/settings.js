import { CogIcon } from '@sanity/icons'
import locales from '../../../shared/locales'

const LINK_TYPES = [{ type: 'ctaPageLink' }, { type: 'ctaAbsUrl' }]

const sameLocaleFilter = ({ document }) => {
  // Make sure only homepages of this language appear in search
  if (document.__i18n_lang) {
    return {
      filter: '__i18n_lang == $locale',
      params: {
        locale: document.__i18n_lang,
      },
    }
  }
  return undefined
}

const pageReference = {
  type: 'reference',
  to: [
    {
      type: 'page',
      title: 'Reference to published page',
      description:
        "💡 if you can't find the page here, make sure its document is published",
    },
  ],
  options: {
    filter: sameLocaleFilter,
  },
  validation: (Rule) => Rule.required(),
}

export default {
  name: 'settings',
  title: 'Settings',
  icon: CogIcon,
  type: 'document',
  i18n: true,
  fields: [
    // Feel free to add other global settings such as brand color, logos, etc.
    {
      name: 'scripts',
      title: 'Custom code for the whole site',
      description:
        "🛑🤚 CAREFUL WHEN EDITING THESE FIELDS! A malicious or bloated script can destroy performance, security and usability of the website. Make sure you know what you're doing.",
      type: 'array',
      of: [
        {
          type: 'customScript',
        },
      ],
    },
    {
      name: 'headerLinks',
      title: '🚢 Header navigation (navbar)',
      description:
        '⚡ Optional but highly encouraged. The last item in the list (top to bottom) is styled as a primary button for extra highlight.',
      type: 'array',
      of: LINK_TYPES,
    },
    {
      name: 'footerLinks',
      title: '🚢👣 Footer navigation',
      description: '❓ Optional',
      type: 'array',
      of: LINK_TYPES,
    },
    {
      name: 'homepage',
      title: 'Homepage for this language',
      ...pageReference,
    },
    {
      name: 'notFound',
      title: 'Not found page for this language',
      ...pageReference,
    },
    {
      name: 'defaultOgImage',
      title: 'Default sharing image',
      description:
        "❓ Optional. If individual pages don't include a sharing image, this one will be used instead",
      type: 'image',
    },
    {
      name: 'socialMedia',
      title: 'Social media accounts',
      options: { collapsible: true, collapsed: false },
      description:
        '❓ All links are optional. Include the full URL - "https://twitter.com/handle" instead of "@handle".',
      type: 'socialMedia',
    },
  ],
  preview: {
    select: {
      lang: '__i18n_lang',
    },
    prepare({ lang }) {
      return {
        title: `Settings (${(lang || locales[0]).toUpperCase()})`,
      }
    },
  },
}
