import { defineField } from 'sanity'

export const pane = defineField({
  name: 'pane',
  title: 'Pane',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})
