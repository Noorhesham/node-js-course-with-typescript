import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { GoHeading } from 'react-icons/go'
import { defineField, defineArrayMember } from 'sanity'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { blockPreview } from 'sanity-pills'
import { definePageComponent } from '../definePageComponent'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { PreviewHeadingBlock } from './PreviewHeadingBlock'

export const headingBlock = definePageComponent({
  name: 'headingBlock',
  title: 'Heading Block',
  description:
    'A heading block, including eyebrow, heading, subheading, and optional CTAs.',
  icon: GoHeading,
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
      title: 'Body',
      description:
        'Optional body text that appears below the heading. Use this for additional context or supporting information.',
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
      group: 'content',
    }),
    defineField({
      name: 'animate',
      title: 'Animate',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Split', value: 'split' },
          { title: 'Stacked', value: 'stacked' },
          { title: 'Anchor', value: 'anchor' },
        ],
      },
      initialValue: 'default',
    }),
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
    preview: PreviewHeadingBlock
  },
})
