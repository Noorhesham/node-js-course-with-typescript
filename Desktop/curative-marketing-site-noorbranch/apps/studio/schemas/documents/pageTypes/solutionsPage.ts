import { seo } from '@/schemas/fields/seo'
import { FiPackage } from 'react-icons/fi'
import { genericPage } from './definePageType'

export const solutionsPage = {
  ...genericPage,
  name: 'solutionsPage',
  title: 'Solutions Page',
  icon: FiPackage,
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'solutions',
        includeSlugPrefixInStoredValue: true,
      },
    },
  ],
}
