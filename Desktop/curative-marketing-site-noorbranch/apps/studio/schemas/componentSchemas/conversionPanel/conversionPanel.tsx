import { ArrowRightIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

import { card } from '../cardDeck/card'

import { definePageComponent } from '@/schemas/componentSchemas/definePageComponent'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { tokenReference } from '@/schemas/fields/tokenReference'

import { PreviewConversionPanel } from './PreviewConversionPanel'


export const conversionPanel = definePageComponent({
  name: 'conversionPanel',
  title: 'Conversion Panel',
  description: 'A panel featuring one or more CTAs.',
  icon: ArrowRightIcon,
  fields: [
    eyebrow,
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: '5xl',
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
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [card],
      validation: (Rule) => [
        // Conversion Panel only supports 2 cards
        Rule.custom((value, context) => {
          const cards = value as unknown[] | undefined

          if (cards?.length && cards.length > 2) {
            return 'Conversion Panel only supports 2 cards'
          }

          return true
        }).warning(),
      ],
    },
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
        ],
      },
      initialValue: 'center',
      group: 'layout'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'layout'
    }),
    defineField({
      name: 'removeOverlayGradient',
      title: 'Remove overlay gradient',
      type: 'boolean',
      group: 'layout'
    })
  ],
  preview: {
    select: {
      heading: 'heading',
      body: 'body'
    },
    prepare(selection) {
      const { heading, body } = selection
      return {
        title: heading?.text?.[0]?.children?.[0]?.text || 'No heading',
        heading,
        body
      }
    }
  },
  components: {
    preview: PreviewConversionPanel
  },
})
