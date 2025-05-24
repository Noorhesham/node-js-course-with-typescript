import { HelpCircleIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { FaqsPreview } from './FaqsPreview'
import { faq } from './faq'

export const faqs = defineField({
  name: 'faqs',
  title: 'FAQs',
  icon: HelpCircleIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [faq],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      questions: 'questions',
    },
  },
  components: {
    // @ts-expect-error
    preview: FaqsPreview,
  },
})
