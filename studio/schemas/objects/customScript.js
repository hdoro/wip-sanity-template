const SCRIPT_TYPES = [
  {
    value: 'headEnd',
    title: 'Before closing of <head>',
  },
  {
    value: 'bodyStart',
    title: 'Right at the start of <body>',
  },
  {
    value: 'bodyEnd',
    title: 'Before closing of <body>',
  },
]

export default {
  type: 'object',
  title: 'Custom script',
  name: 'customScript',
  fields: [
    {
      name: 'type',
      title: 'Where to put this code',
      validation: (Rule) => Rule.required(),
      options: {
        list: SCRIPT_TYPES,
        layout: 'radio',
      },
      type: 'string',
    },
    {
      name: 'script',
      title: 'HTML code',
      description:
        'If you want to add some Javascript or CSS, put the code inside <script> or <style> tags, respectively.',
      validation: (Rule) => Rule.required(),
      rows: 10,
      type: 'text',
    },
  ],
  preview: {
    select: {
      script: 'script',
      type: 'type',
    },
    prepare({ script, type }) {
      const title =
        SCRIPT_TYPES.find((t) => t.value === type)?.title || 'Type not set'
      return {
        title,
        subtitle: script,
      }
    },
  },
}
