import { defineField } from 'sanity'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'front',
      title: 'Front',
      type: 'object',
      fields: [
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
    }),
    defineField({
      name: 'back',
      title: 'Back',
      type: 'object',
      fields: [
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
    }),
  ],
  preview: {
    select: {
      body: 'front.body',
    },
    prepare: ({ body }) => ({
      title: Array.isArray(body) && body.length > 0 ? body[0].children[0].text : 'No content',
    }),
  },
})
