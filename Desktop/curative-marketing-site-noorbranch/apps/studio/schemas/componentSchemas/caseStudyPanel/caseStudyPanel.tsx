import { ctaField } from '@/schemas/fields/ctaField'
import { heading } from '@/schemas/fields/heading'
import { InlineElementIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewCaseStudyPanel } from './PreviewCaseStudyPanel'
import { caseStudyField } from './caseStudyEntry'

export const caseStudyPanel = definePageComponent({
  name: 'caseStudyPanel',
  title: 'Case Study Panel',
  description:
    'A component that allows the user to switch between case studies.',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Switcher', value: 'switcher' },
          { title: 'Bento', value: 'bento' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'switcher',
    }),
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-lg',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),

    defineField({
      title: 'CTA',
      name: 'cta',
      type: 'array',
      of: [
        {
          ...ctaField,
          name: 'localCta',
        },
        defineField({
          title: 'Shared CTA',
          name: 'reference',
          type: 'reference',
          to: [
            {
              type: 'cta',
              options: {
                filter: 'type in $allowedTypes',
                filterParams: {
                  allowedTypes: ['internalLink', 'externalLink'],
                },
              },
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.max(1).error('Only one CTA is allowed'),
    }),

    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      description: 'Links to case studies to display in the panel.',
      type: 'array',
      of: [caseStudyField],
      validation: (Rule) => [
        // Bento style only supports up to 3 case studies
        Rule.custom((value, context) => {
          const caseStudies = value as unknown[] | undefined
          const parent = context.parent as { style: string } | undefined

          if (
            parent?.style === 'bento' &&
            caseStudies?.length &&
            caseStudies?.length > 3
          ) {
            return 'Bento style only supports up to 3 case studies'
          }

          return true
        }).warning(),

        // The panel can only have up to 2 metrics
        Rule.custom((value, context) => {
          const parent = (context.parent as { style: string }) || undefined

          const caseStudies = value as { metrics: unknown[] }[] | undefined

          const countOfMetrics =
            caseStudies?.reduce(
              (acc, caseStudy) => acc + (caseStudy.metrics || []).length,
              0,
            ) || 0

          const isBentoStyle = parent?.style === 'bento'

          if (isBentoStyle && countOfMetrics > 2) {
            return `In bento mode, the panel can only have up to 2 metrics. Currently, the panel has ${countOfMetrics}. Please remove ${countOfMetrics - 2}.`
          }

          return true
        }).warning(),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      subheading: 'subheading',
      caseStudies: 'caseStudies',
    },
    prepare({ heading, subheading, caseStudies }) {
      return {
        title: 'Case Study Panel',
        heading,
        subheading,
        caseStudies,
      }
    },
  },
  components: {
    preview: PreviewCaseStudyPanel,
  },
})
