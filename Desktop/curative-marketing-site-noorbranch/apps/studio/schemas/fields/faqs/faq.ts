import { defineField } from 'sanity'

export const faq = defineField({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.required().warning('Please provide a question'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required().warning('Please provide an answer'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})
