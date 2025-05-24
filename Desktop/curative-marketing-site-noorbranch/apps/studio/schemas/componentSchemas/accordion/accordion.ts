import { TfiLayoutAccordionSeparated } from 'react-icons/tfi'
import { definePageComponent } from '../definePageComponent'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { defineField, defineArrayMember } from 'sanity'
import { accordionItem } from './accordionItem'
import { PreviewAccordion } from './PreviewAccordion'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'

export const accordion = definePageComponent({
  name: 'accordion',
  title: 'Accordion',
  description: 'Accordion component',
  icon: TfiLayoutAccordionSeparated,
  fields: [
    eyebrow,
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: '2xl',
      },
    },
    defineField({
      name: 'body',
      title: 'body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          marks: {
            annotations: [link, internalLink],
          },
          of: [tokenReference],
        }),
        {
          ...ctaBar,
          description:
            'These CTAs will be displayed below the subheading and above the CTA cards.',
          options: {
            allowedCtaTypes: [
              'link',
              'internalLink',
              'download',
              'emailCapture',
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [accordionItem],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => ({
      title: 'Accordion',
      items,
    }),
  },
  components: {
    preview: PreviewAccordion,
    input: GenericInputWithJsonView,
  },
})
