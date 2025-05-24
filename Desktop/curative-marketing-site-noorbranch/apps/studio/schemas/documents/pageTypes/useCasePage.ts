import { seo } from '@/schemas/fields/seo'
import { genericPage } from './definePageType'

export const useCasePage = {
  ...genericPage,
  name: 'useCasePage',
  title: 'Use Case Page',
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'use-cases',
        includeSlugPrefixInStoredValue: true,
      },
    },
  ],
}
