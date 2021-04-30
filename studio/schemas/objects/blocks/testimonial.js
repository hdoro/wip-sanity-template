import { CommentIcon } from '@sanity/icons'

import blockPreview from '../../../src/utils/blockPreview'
import { hideBlockFld } from '../../../src/utils/commonBlockFields'

// 💡 You could also model testimonials as re-usable documents
const testimonialBlock = {
  name: 'block.testimonial',
  title: 'Testimonial',
  icon: CommentIcon,
  type: 'object',
  fields: [
    {
      name: 'body',
      title: 'Content / quote',
      type: 'richParagraph',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name of the person',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role/company of the person',
      description: '⚡ Optional but highly encouraged',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Photo of the person / logo of the company',
      description: '❓ Optional',
      type: 'image',
    },
    hideBlockFld,
  ],
}

export default {
  ...testimonialBlock,
  preview: blockPreview(testimonialBlock),
}
