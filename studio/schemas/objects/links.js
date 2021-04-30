import { LinkIcon, LeaveIcon } from '@sanity/icons'
import { BASE_URL, SITE_DOMAIN } from '../../../shared/config'

const newWindowFld = {
  name: 'newWindow',
  title: 'Open the link in a new window?',
  type: 'boolean',
  initialValue: false,
  validation: (Rule) => Rule.required(),
}

const absUrlFld = {
  name: 'url',
  title: 'Absolute URL to another site site or internal section',
  description: `💡 If you want to send users to a page on the website, use an internal link! Copy the whole URL instead of just the domain (ex: ${BASE_URL} instead of ${SITE_DOMAIN}). If you want to send users to a section of a page in the website, use #id-of-the-section (see tutorial).`,
  type: 'url',
  validation: (Rule) =>
    Rule.required()
      .uri({
        allowRelative: true,
        scheme: ['http', 'https', 'mailto', 'tel'],
      })
      .error('URL is required'),
}

const pageLinkFld = {
  name: 'pageLink',
  title: 'Link to another route on the site',
  description: `💡 search for the route by internal title. If you don't find it, make sure it's published in the routes menu.`,
  type: 'reference',
  to: [{ type: 'page' }],
  validation: (Rule) => Rule.required(),
  options: {
    /**
     * Filter to prevent showing:
     * - unpublished documents;
     * - invalid documents (no slug or no internalTitle)
     * - the same document as the current one
     * - documents from other languages
     */
    filter: ({ document }) => {
      return {
        filter: /* groq */ `
        __i18n_lang == $lang &&
        _id != $id &&
        defined(slug.current) &&
        defined(internalTitle) &&
        publishStatus in ["hidden", "public"]`,
        params: {
          // Making sure we're preventing the currently published document from showing up. Drafts never show up here, anyways.
          id: document._id.replace('drafts.', ''),
          lang: document.__i18n_lang || 'en',
        },
      }
    },
  },
}

const labelFld = {
  name: 'label',
  title: 'Button/link title or label',
  type: 'string',
  validation: (Rule) =>
    Rule.custom((value, { parent }) => {
      // Only error out if the target is defined.
      // If not, we conclude the CTA won't be used
      if ((!!parent.url || !!parent.pageLink?._ref) && !value) {
        return 'Button title is required'
      }
      return true
    }),
}

// Used inside the portable text editor (page.body)
export const blockAbsUrl = {
  name: 'blockAbsUrl',
  type: 'object',
  title: 'Link to external sites',
  icon: LeaveIcon,
  fields: [absUrlFld, newWindowFld],
  options: {
    editModal: 'fullscreen',
  },
}

// Used inside the portable text editor (page.body)
export const blockPageLink = {
  name: 'blockPageLink',
  type: 'object',
  title: 'Internal link',
  icon: LinkIcon,
  fields: [pageLinkFld, newWindowFld],
  options: {
    editModal: 'fullscreen',
  },
}

// Used in settings for menus and inside blocks
const ctaPageLink = {
  name: 'ctaPageLink',
  title: 'Internal link to another page',
  icon: LinkIcon,
  type: 'object',
  options: { collapsible: true },
  fields: [labelFld, pageLinkFld, newWindowFld],
  preview: {
    select: {
      title: 'label',
      pageTitle: 'pageLink.internalTitle',
      newWindow: 'newWindow',
    },
    prepare({ title, pageTitle, newWindow }) {
      let subtitleParts = []
      if (newWindow) {
        subtitleParts = ['new window']
      }
      if (pageTitle) {
        subtitleParts = [`Page: ${pageTitle}`, ...subtitleParts]
      } else {
        subtitleParts = ['No page chosen']
      }
      return {
        title,
        subtitle: subtitleParts.join(' - '),
      }
    },
  },
}

// Used in settings for menus and inside blocks
const ctaAbsUrl = {
  name: 'ctaAbsUrl',
  title: 'URL to another site or internal section (through #id)',
  icon: LeaveIcon,
  type: 'object',
  options: { collapsible: true },
  fields: [labelFld, absUrlFld, newWindowFld],
  preview: {
    select: {
      title: 'label',
      url: 'url',
      newWindow: 'newWindow',
    },
    prepare({ title, url, newWindow }) {
      let subtitleParts = []
      if (newWindow) {
        subtitleParts = ['new window']
      }
      if (url) {
        subtitleParts = [url, ...subtitleParts]
      } else {
        subtitleParts = ['No URL set']
      }
      return {
        title,
        subtitle: subtitleParts.join(' - '),
      }
    },
  },
}

export default [blockAbsUrl, blockPageLink, ctaPageLink, ctaAbsUrl]
