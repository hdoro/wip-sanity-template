/**
 * Defines which document types can be added from the "Create new" dialog. We want to show all of them except singletons.
 */
import S from '@sanity/base/structure-builder'
import SINGLETON_TYPES from '../utils/singletons'

export default [
  ...S.defaultInitialValueTemplateItems().filter(({ spec }) => {
    return (
      !SINGLETON_TYPES.includes(spec.templateId) &&
      spec.templateId !== 'media.tag'
    )
  }),
]
