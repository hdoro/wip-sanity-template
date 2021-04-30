// Example implementation of a customizable page hero
export default {
  name: 'pageHero',
  title: 'Hero / page header',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description:
        "💡 use line breaks if you want to break the title at specific points, but don't use the extra room to put too much content!",
      type: 'text',
      rows: 1,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body / paragraph under title',
      description: '❓ Optional',
      type: 'richParagraph',
    },
    {
      name: 'ctas',
      title: 'Calls to action / button links',
      description: '⚡ Optional but highly encouraged to drive conversions',
      type: 'array',
      validation: (Rule) => [Rule.unique()],
      of: [{ type: 'ctaPageLink' }, { type: 'ctaAbsUrl' }],
    },
    // Create as many layouts as your editors need for creating LPs
    {
      name: 'layout',
      title: 'Header layout',
      type: 'string',
      initialValue: '1-column-center',
      options: {
        list: [
          {
            value: 'image-right',
            title: 'Image on the right with colored background',
          },
          {
            value: '1-column-center',
            title: 'Center aligned content with white background',
          },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'image',
      title: 'Image',
      description: '❓ Optional',
      type: 'image',
    },
  ],
}
