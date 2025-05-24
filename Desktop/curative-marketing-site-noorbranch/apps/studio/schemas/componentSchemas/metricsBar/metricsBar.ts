import { NumberIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const metricsBar = defineField({
  name: 'metricsBar',
  title: 'Metrics Bar',
  type: 'object',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      validation: (Rule) => Rule.max(3).warning('Only 3 metrics are allowed.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      metrics: 'metrics',
    },
    prepare: ({ metrics }) => ({
      title: 'Metrics Bar',
      subtitle: metrics?.length
        ? `${metrics.length} metric${metrics.length > 1 ? 's' : ''}`
        : 'No metrics added yet',
    }),
  },
})
