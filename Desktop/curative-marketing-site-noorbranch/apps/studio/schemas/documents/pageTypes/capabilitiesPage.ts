import { seo } from '@/schemas/fields/seo'
import { FiStar } from 'react-icons/fi'
import { genericPage } from './definePageType'

export const capabilitiesPage = {
  ...genericPage,
  name: 'capabilitiesPage',
  title: 'Capabilities Page',
  icon: FiStar,
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
}
