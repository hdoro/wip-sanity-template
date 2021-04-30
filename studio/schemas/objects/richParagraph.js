import { blockAbsUrl, blockPageLink } from './links'

// Used for rich formatting in blocks (blurbs, sideImage, etc.) without allowing for headings or blocks.
export default {
  name: 'richParagraph',
  title: 'Rich paragraph',
  type: 'array',
  of: [
    {
      type: 'block',
      lists: [],
      styles: [],
      marks: {
        annotations: [blockAbsUrl, blockPageLink],
      },
    },
  ],
}
