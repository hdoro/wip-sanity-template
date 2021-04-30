import React from 'react'
import { ImageIcon } from '@sanity/icons'
import { hideBlockFld } from '../../../src/utils/commonBlockFields'

const ImagePreview = ({ value = {} } = {}) => {
  if (!value?.imgUrl) {
    return null
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={value.imgUrl}
        alt={value.alt || value.caption}
        style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
      />
      {value.caption && (
        <p style={{ fontStyle: 'italic', margin: '15px 0' }}>{value.caption}</p>
      )}
    </div>
  )
}

const imageBlock = {
  name: 'block.image',
  title: 'Image block',
  icon: ImageIcon,
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image to be displayed',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Visible caption below the image',
      description: '❓ Optional',
      type: 'string',
    },
    {
      name: 'alt',
      title: 'Alternative text for screen readers',
      description:
        '⚡ Optional but highly encouraged for accessibility. If none provided, will fallback to the visible caption above.',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Image size',
      type: 'string',
      description:
        "Remember that this is limited by the original size of the image: if it's too small it can occupy just a portion of the desired size or get super blurry.",
      options: {
        layout: 'radio',
        list: [
          {
            value: 'sm',
            title: 'Small',
          },
          {
            value: 'md',
            title: 'Medium',
          },
          {
            value: 'lg',
            title: 'Large',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'md',
    },
    hideBlockFld,
  ],
  preview: {
    select: {
      caption: 'caption',
      imgUrl: 'image.asset.url',
      alt: 'image.alt',
    },
    component: ImagePreview,
  },
}

export default imageBlock
