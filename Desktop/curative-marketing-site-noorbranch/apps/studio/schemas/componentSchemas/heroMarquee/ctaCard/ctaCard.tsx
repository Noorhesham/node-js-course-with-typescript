import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { PiArrowSquareRight } from 'react-icons/pi'
import { defineField } from 'sanity'
import { PreviewCtaCard } from './PreviewCtaCard'

export const ctaCard = defineField({
  name: 'ctaCard',
  title: 'CTA Card',
  type: 'object',
  icon: PiArrowSquareRight,
  fields: [
    defineField({
      name: 'leadInText',
      title: 'Lead-In Text',
      type: 'string',
      initialValue: 'Have a more general question?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Go to Contact Us page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Link to Content', value: 'internal' },
        ],
      },
      initialValue: 'internal',
    }),
    {
      ...link,
      name: 'externalLink',
      title: 'External Link',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    },
    {
      ...internalLink,
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
  ],
  preview: {
    select: {
      leadInText: 'leadInText',
      ctaText: 'ctaText',
      externalLink: 'externalLink',
      internalLink: 'internalLink',
    },
    prepare({ leadInText, ctaText, externalLink, internalLink }) {
      return {
        title: 'CTA Card',
        leadInText,
        ctaText,
        externalLink,
        internalLink,
      }
    },
  },
  components: {
    // @ts-expect-error
    preview: PreviewCtaCard,
  },
})
