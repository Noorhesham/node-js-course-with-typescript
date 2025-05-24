import { icon } from '@/schemas/fields/icon'
import { defineField } from 'sanity'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    {
      ...icon,
    },
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
  ],
})
