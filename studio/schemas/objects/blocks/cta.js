import { BellIcon } from '@sanity/icons'

import blockPreview from '../../../src/utils/blockPreview'
import { hideBlockFld } from '../../../src/utils/commonBlockFields'

const ctaBlock = {
  name: 'block.cta',
  title: 'CTAs 🧲',
  type: 'object',
  icon: BellIcon,
  fields: [
    {
      name: 'title',
      title: 'Section title (above the buttons/ctas)',
      description: '❓ Optional',
      type: 'string',
    },
    {
      name: 'suptitle',
      title: 'Label / suptitle above section title',
      description: '❓ Optional',
      type: 'string',
    },
    {
      name: 'ctas',
      title: 'Calls to action / button links',
      type: 'array',
      validation: (Rule) => [
        Rule.required().min(1).error('Required field with at least 1 entry.'),
        Rule.unique(),
      ],
      of: [{ type: 'ctaPageLink' }, { type: 'ctaAbsUrl' }],
    },
    hideBlockFld,
  ],
}

export default {
  ...ctaBlock,
  preview: blockPreview(ctaBlock),
}
