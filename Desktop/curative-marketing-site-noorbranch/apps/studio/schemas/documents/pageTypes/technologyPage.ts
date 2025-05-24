import { seo } from '@/schemas/fields/seo'
import { FiCpu } from 'react-icons/fi'
import { genericPage } from './definePageType'

import { defineType } from 'sanity'

export const technologyPage = defineType({
  ...genericPage,
  name: 'technologyPage',
  title: 'Technology Page',
  icon: FiCpu,
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'capabilities',
        includeSlugPrefixInStoredValue: false,
      },
    },
  ],
})
