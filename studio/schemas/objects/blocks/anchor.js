import { ControlsIcon } from '@sanity/icons'
import getSlug from 'speakingurl'

import blockPreview from '../../../src/utils/blockPreview'

const anchorBlock = {
  name: 'block.anchor',
  title: 'Anchor for internal links ⚓',
  icon: ControlsIcon,
  type: 'object',
  fields: [
    {
      name: 'anchorId',
      title: 'ID for internal links',
      description:
        "💡 we need it to be in the format lowercase-letters-without-space-or-special-characters. When linking to this section, use #id-of-the-section at the very end of the link's URL.",
      type: 'string',
      validation: (Rule) => [
        Rule.optional().custom((value) => {
          if (!value) {
            return 'The anchor ID is required'
          }
          const slugified = getSlug(value)
          if (slugified !== value) {
            return 'Do not include spaces, special characters or uppercase letters'
          }
          return true
        }),
      ],
    },
  ],
}

export default {
  ...anchorBlock,
  preview: blockPreview(anchorBlock),
}
