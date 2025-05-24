import { ctaField } from '@/schemas/fields/ctaField'
import { ArrowRightIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { PreviewCtaBar } from './PreviewCtaBar'

export const ctaBar = defineField({
  name: 'ctaBar',
  title: 'CTA Bar',
  icon: ArrowRightIcon,
  type: 'object',
  options: {
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [
        {
          ...ctaField,
          name: 'localCta',
        },
        {
          title: 'Shared CTA',
          type: 'reference',
          to: [{ type: 'cta' }],
          options: {
            filter: 'type in $types',
            filterParams: {
              types: ['link', 'internalLink', 'download'],
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      ctas: 'ctas',
    },
    prepare({ ctas }) {
      return {
        title: 'CTA Bar',
        subtitle: '',
        value: { ctas },
      }
    },
  },
  components: {
    preview: PreviewCtaBar,
  },
})
