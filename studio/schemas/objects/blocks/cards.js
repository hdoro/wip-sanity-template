import { ComponentIcon, ComposeIcon, SquareIcon } from '@sanity/icons'

import blockPreview from '../../../src/utils/blockPreview'
import { hideBlockFld } from '../../../src/utils/commonBlockFields'

/**
 * Flexible block for any layout that includes a grid of cards - with or without images.
 * Synonyms: blurbs, media columns
 */
const card = {
  name: 'block.cards.card',
  title: 'Card',
  icon: SquareIcon,
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image / icon',
      description: '⚡ Optional but highly encouraged',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative text for screen readers',
          description: '⚡ Optional but highly encouraged',
          type: 'string',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      description:
        "💡 use line breaks if you want to break the title at specific points, but don't use the extra room to put too much content!",
      validation: (Rule) => Rule.required(),
      type: 'text',
      rows: 1,
    },
    {
      name: 'body',
      title: 'Body / paragraph under title',
      description: '❓ Optional',
      type: 'richParagraph',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      media: 'image',
    },
  },
}

const cardsBlock = {
  name: 'block.cards',
  title: 'Cards / media columns / blurbs',
  icon: ComposeIcon,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section title (above the columns)',
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
      name: 'layout',
      title: 'Layout of this section',
      type: 'string',
      initialValue: '3-columns',
      options: {
        list: [
          {
            value: 'side-image',
            title: 'Images on alternating sides (desktop)',
          },
          {
            value: '3-columns',
            title: '3 columns (on desktop)',
          },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'items',
      title: 'Columns / cards / segments',
      type: 'array',
      of: [{ type: 'block.cards.card' }],
      validation: (Rule) => [
        Rule.required().min(1).error('Required field with at least 1 entry.'),
        Rule.unique(),
      ],
    },
    hideBlockFld,
  ],
}

export default [
  card,
  {
    ...cardsBlock,
    preview: blockPreview(cardsBlock),
  },
]
