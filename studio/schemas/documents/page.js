import React from 'react'
import { MediaEditor } from 'sanity-plugin-asset-source-ogimage'
import SlugInput from 'sanity-plugin-better-slug'
import { DocumentIcon } from '@sanity/icons'
import MediaAssetSource from 'part:sanity-plugin-media/asset-source'

import { BASE_URL, SITE_DOMAIN } from '../../../shared/config'
import locales from '../../../shared/locales'
import OgImageEditor from '../../src/components/OgImageEditor'
import isSlugUnique from '../../src/utils/isSlugUnique'

export default {
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  type: 'document',
  i18n: true,
  fieldsets: [
    {
      name: 'meta',
      title: 'ℹ About this page',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'internalTitle',
      title: 'Title for internal reference',
      description:
        "💡 this won't show up for users, just make sure you add a descriptive name which will make it easy to find this page later when searching, changing the navigation or browsing the CMS.",
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishStatus',
      title: 'Publish status',
      type: 'string',
      initialValue: 'private',
      validation: (Rule) => Rule.required(),
      options: {
        layout: 'radio',
        list: [
          {
            value: 'private',
            title: '🔒 Private (not accessible outside preview)',
          },
          {
            value: 'hidden',
            title:
              "🙈 Hidden (won't show up in Google, but accessible through URL)",
          },
          {
            value: 'public',
            title: '👐 Public',
          },
        ],
      },
    },
    {
      name: 'slug',
      title: 'Relative address on the website',
      description: `If this page will be set as the homepage in settings, this relative address will be used to redirect to the homepage, which will be available at ${BASE_URL}/[language]`,
      type: 'slug',
      validation: (Rule) => Rule.required(),
      fieldset: 'meta',
      options: {
        source: 'internalTitle',
        // SlugInput will also include the locale-based path
        basePath: SITE_DOMAIN,
        isUnique: isSlugUnique,
      },
      inputComponent: SlugInput,
    },
    {
      name: 'seoTitle',
      title: 'Title for SEO & social sharing',
      description:
        'Shows up in search engines as well as when sharing the link on social media. Refer to "Social & SEO" above to see how this page will look like on these mediums.',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'meta',
    },
    {
      name: 'seoDescription',
      title: 'Short paragraph for SEO & social sharing',
      description:
        "⚡ Optional but highly encouraged as it'll help you convert more visitors from Google & social",
      type: 'text',
      rows: 1,
      validation: (Rule) => Rule.optional(),
      fieldset: 'meta',
    },
    {
      name: 'ogImage',
      title: 'Social sharing image',
      description:
        '⚡ Optional but highly encouraged for increasing conversion rates for links to this page shared in social media.',
      type: 'image',
      fieldset: 'meta',
      options: {
        sources: [
          MediaAssetSource,
          {
            name: 'generate-ogimage',
            title: 'Generate sharing image',
            icon: () => <div>🎨</div>,
            component: (props) => (
              <MediaEditor {...props} layouts={[OgImageEditor]} />
            ),
          },
        ],
      },
    },
    {
      name: 'scripts',
      title: 'Custom code for the this page',
      description:
        "🛑🤚 CAREFUL WHEN EDITING THESE FIELDS! A malicious or bloated script can destroy performance, security and usability of the website. Make sure you know what you're doing. This only applies to this page. If you want to edit scripts for the whole site, go to Settings ;)",
      type: 'array',
      fieldset: 'meta',
      of: [
        {
          type: 'customScript',
        },
      ],
    },
    {
      name: 'hero',
      title: 'Hero / page header',
      description: 'Comes above the body',
      type: 'pageHero',
      validation: (Rule) => Rule.required(),
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'body',
      title: 'Content / body of the page',
      description:
        "❓ Optional. Your page can be composed solely of a header with calls to action if that's all you need.",
      type: 'pageBody',
      options: {
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      title: 'internalTitle',
      lang: '__i18n_lang',
      media: 'ogImage',
      seoDescription: 'seoDescription',
      heroTitle: 'hero.title',
    },
    prepare({ title, lang, media, seoDescription, heroTitle }) {
      return {
        title: `${title} (${(lang || locales[0]).toUpperCase()})`,
        subtitle: heroTitle || seoDescription,
        media,
      }
    },
  },
}
