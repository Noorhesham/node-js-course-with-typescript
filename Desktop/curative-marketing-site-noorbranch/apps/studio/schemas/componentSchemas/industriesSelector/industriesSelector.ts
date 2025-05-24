import { CaseIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { industries } from '@/schemas/componentSchemas/industriesSelector/industries'
import { PreviewIndustriesSelector } from './PreviewIndustriesSelector'

export const industriesSelector = defineField({
  name: 'industriesSelector',
  title: 'Industries Selector',
  description: 'Selector for Industries',
  icon: CaseIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [industries],
    }),
  ],
  preview: {
    select: {
      industries: 'industries',
    },
  },
  components: {
    preview: PreviewIndustriesSelector,
  },
})
