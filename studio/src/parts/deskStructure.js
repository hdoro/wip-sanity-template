/**
 * Defines the menu structure for documents for editors.
 * For example, it puts a single settings document at the root menu to make its access easier and prevent the creation of new ones
 */
import S from '@sanity/desk-tool/structure-builder'
import * as Structure from 'sanity-plugin-intl-input/lib/structure'
import SocialPreview from 'part:social-preview/component'
import {
  HelpCircleIcon,
  HeartIcon,
  MobileDeviceIcon,
  EyeOpenIcon,
  EditIcon,
  EarthGlobeIcon,
} from '@sanity/icons'

import SINGLETON_TYPES from '../utils/singletons'
import EditorGuide from '../components/EditorGuide'
import { MobilePreview, WebPreview } from '../components/PreviewDisplay'
import { BASE_URL } from '../../../shared/config'

/**
 * Defines views/tabs for each content type.
 * For example, pages have a "Translations" tab controlled by sanity-plugin-intl-input
 */
export const getDefaultDocumentNode = (props) => {
  const intlViews = Structure.getDocumentNodeViewsForSchemaType(
    props.schemaType,
  ).map((view) => {
    // Let's customize the plugin's default view items
    if (view?.spec?.id === 'editor') {
      return S.view.form().title('Content').icon(EditIcon)
    }
    if (view?.spec?.id === 'translations') {
      return S.view
        .component(view.spec.component)
        .title('Translations')
        .icon(EarthGlobeIcon)
    }
    return view
  })
  if (props.schemaType !== 'page') {
    return S.document().views(intlViews)
  }

  return S.document().views([
    ...intlViews,
    S.view
      .component(
        SocialPreview({
          prepareFunction: ({ seoTitle, seoDescription, ogImage }) => ({
            title: seoTitle,
            description: seoDescription,
            siteUrl: BASE_URL,
            ogImage,
          }),
        }),
      )
      .title('Social & SEO')
      .icon(HeartIcon),
    S.view.component(WebPreview).title('Desktop preview').icon(EyeOpenIcon),
    S.view
      .component(MobilePreview)
      .title('Mobile preview')
      .icon(MobileDeviceIcon),
  ])
}

export default () => {
  const allItems = Structure.getFilteredDocumentTypeListItems()
  const items = allItems.filter((item) => {
    if (
      [
        ...SINGLETON_TYPES,
        '__i18n_translations_maintenance_tab',
        'media.tag',
      ].includes(item.spec?.id)
    ) {
      return false
    }
    return true
  })
  return S.list()
    .id('__root__')
    .title('Content')
    .items([
      S.listItem()
        .title('Editor guide')
        .icon(HelpCircleIcon)
        .child(
          S.component('guide').title('Editor guide').component(EditorGuide),
        ),
      ...items,
      S.divider(),
      S.documentListItem()
        .id('settings')
        .schemaType('settings')
        .title('Settings'),
    ])
}
