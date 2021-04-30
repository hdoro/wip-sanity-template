import { blockAbsUrl, blockPageLink } from './links'

export default {
  name: 'pageBody',
  title: 'Page body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        // We don't want H1s here as these are provided through page.hero.title
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        annotations: [blockAbsUrl, blockPageLink],
      },
      /**
       * If you want to provide inline blocks for features like re-usable contact information that editors can insert in the middle of paragraphs, add the desired types in the commented `of` array below
       */
      // of: []
    },
    { type: 'block.anchor' },
    { type: 'block.cards' },
    { type: 'block.cta' },
    { type: 'block.iframe' },
    { type: 'block.testimonial' },
    { type: 'block.image' },
    /**
     * Ideas for other blocks:
     * block.client_logos
     * block.newsletter_cta
     * block.pricing_table
     * block.quiz
     * block.image_gallery
     * block.team
     *
     * The sky is the limit 🚀
     **/
  ],
  options: {
    editModal: 'fullscreen',
  },
}
