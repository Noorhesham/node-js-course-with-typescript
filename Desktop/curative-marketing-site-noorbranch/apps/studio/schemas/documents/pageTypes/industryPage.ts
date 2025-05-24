import { seo } from '@/schemas/fields/seo'
import { genericPage } from './definePageType'

export const industryPage = {
  ...genericPage,
  name: 'industryPage',
  title: 'Industry Page',
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'industries',
        includeSlugPrefixInStoredValue: false,
      },
    },
  ],
}
