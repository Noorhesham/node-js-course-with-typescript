import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { TbPercentage } from 'react-icons/tb'
import { stat } from './stat'
import { PreviewStatsPanel } from './PreviewStatsPanel'
import { heading } from '@/schemas/fields/heading'

export const statsPanel = definePageComponent({
  name: 'statsPanel',
  title: 'Stats Panel',
  description: 'A series of cards that display statistics.',
  icon: TbPercentage,
  fields: [
    {
      ...heading,
      group: 'content',
      initialValue: {
        headingLevel: 'h1',
        headingSize: '2xl',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [stat],
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare: ({ stats }) => ({
      title: 'Stats Panel',
      subtitle: stats?.length ? `${stats.length} stats` : 'No stats added yet',
      media: TbPercentage,
      stats
    }),
  },
  components: {
    preview: PreviewStatsPanel,
  },
})
