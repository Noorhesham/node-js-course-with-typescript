import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const accordionItem = defineField({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
    },
    prepare: ({ title, body }) => {
      const subtitle = body ? blockPreview(body) : 'No body text given'
      return {
        title: title || 'No title given',
        subtitle,
      }
    },
  },
})
