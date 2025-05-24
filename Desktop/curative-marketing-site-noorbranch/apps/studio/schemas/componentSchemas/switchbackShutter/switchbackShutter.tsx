import { defineArrayMember, defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'
import { ctaCard } from '../hero/ctaCard/ctaCard'

import { complexComponentBody } from '@/schemas/fields'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { tokenReference } from '@/schemas/fields/tokenReference'

export const switchbackShutter = definePageComponent({
  name: 'switchbackShutter',
  title: 'Switchback Shutter',
  description: 'Switchback Shutter',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    }),
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
      ],
      group: 'content',
    }),
    defineField({
      ...ctaBar,
      description:
        'These CTAs will be displayed below the subheading and above the CTA cards.',
    }),
    defineField({
      name: 'items',
      title: 'Switchback Items',
      type: 'array',
      validation: (Rule) => Rule.max(10),
      of: [
        defineField({
          name: 'item',
          title: 'Switchback',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            {
              ...complexComponentBody,
              name: 'subhead',
              title: 'Sub Head',
              group: '',
              of: [...complexComponentBody.of, ctaCard],
              options: {
                allowedCtaTypes: [
                  'link',
                  'internalLink',
                  'emailCapture',
                  'playVideo',
                  'glassLinkCard',
                ],
              },
            },
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
    },
    prepare: ({ internalName }) => ({
        title: `${internalName} | Switchback Shutter`,
      }),
  },
  components: {
    // preview: PreviewSwitchbackShutter,
  },
})
