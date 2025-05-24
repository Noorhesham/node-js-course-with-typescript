import { metric } from '@/schemas/fields/metric'
import { BarChartIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { sectionStyleIsBento } from './sectionStyleIsBento'

export const caseStudyField = defineField({
  name: 'caseStudyEntry',
  title: 'Case Study',
  icon: BarChartIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'tabTitle',
      title: 'Tab Title',
      description: 'The title of the switcher tab for this case study',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!sectionStyleIsBento(context) && !value) {
            return 'Tab Title is required in Switcher style'
          }

          return true
        }),
      hidden: (context) => {
        return sectionStyleIsBento(context)
      },
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      description: 'The case study to display when this tab is selected',
      type: 'reference',
      to: [{ type: 'clientStory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      description: 'The metrics to display for this case study',
      type: 'array',
      of: [metric],
      validation: (Rule) =>
        Rule.max(2).warning(
          'A maximum of 2 metrics are allowed per case study.',
        ),
    }),
    defineField({
      name: 'overrideImage',
      title: 'Override Image',
      options: {
        collapsible: true,
        collapsed: true,
      },
      description:
        "An image to use in place of the case study's featured image (optional)",
      type: 'image',
    }),
    defineField({
      name: 'caseStudyHighlight',
      title: 'Case Study Highlight',
      description:
        'A testimonial or custom text to highlight at the bottom of this case study card (optional)',
      type: 'object',
      hidden: (context) => {
        return sectionStyleIsBento(context)
      },
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Testimonial', value: 'testimonial' },
              { title: 'Custom Text', value: 'customText' },
            ],
          },
          initialValue: 'testimonial',
        }),
        defineField({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'reference',
          to: [{ type: 'testimonial' }],
          hidden: ({ parent }) => parent?.type !== 'testimonial',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'customText',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'minimalRichText',
          hidden: ({ parent }) => parent?.type !== 'customText',
        }),
        defineField({
          name: 'includeCta',
          title: 'Include CTA?',
          description:
            'If enbled, a CTA that links to the case study will be displayed below the body.',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => parent?.type !== 'customText',
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
          initialValue: "See <BRAND>'s Story",
          hidden: ({ parent }) =>
            parent?.type !== 'customText' || !parent?.includeCta,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | { type: string; includeCta: boolean }
                | undefined
              if (
                parent?.type === 'customText' &&
                parent?.includeCta &&
                !value
              ) {
                return 'CTA Label is required for Custom Text'
              }

              return true
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      tabTitle: 'tabTitle',
      caseStudyTitle: 'caseStudy.title',
      metrics: 'metrics',
    },
    prepare({ tabTitle, caseStudyTitle, metrics }) {
      const title = tabTitle || caseStudyTitle
      const subtitle = tabTitle
        ? `${caseStudyTitle.slice(0, 25)}...`
        : undefined
      const metricsString = metrics?.length
        ? `(${metrics.length} metric${metrics.length > 1 ? 's' : ''})`
        : ''

      const subtitleString = [subtitle, metricsString].filter(Boolean).join(' ')
      return {
        title,
        subtitle: subtitleString,
      }
    },
  },
})
