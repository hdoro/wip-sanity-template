import React from 'react'
import { CodeBlockIcon } from '@sanity/icons'

import blockPreview from '../../../src/utils/blockPreview'
import { hideBlockFld } from '../../../src/utils/commonBlockFields'

const iframeBlock = {
  name: 'block.iframe',
  title: 'iFrame (YouTube, Google Forms, etc.)',
  icon: CodeBlockIcon,
  type: 'object',
  fields: [
    {
      name: 'code',
      title: '"Embed" for the iFrame',
      description:
        '💡 Take a look at the tutorial to understand this. Beware of what you include here, it can damage performance and security of the website, so only use code from trustworthy sources.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    hideBlockFld,
  ],
}

export default {
  ...iframeBlock,
  preview: blockPreview(iframeBlock, {
    customPreview: ({ value }) => {
      return <div dangerouslySetInnerHTML={{ __html: value.code }} />
    },
  }),
}
