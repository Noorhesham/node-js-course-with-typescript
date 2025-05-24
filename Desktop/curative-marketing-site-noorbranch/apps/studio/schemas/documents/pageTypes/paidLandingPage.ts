import { seo } from '@/schemas/fields/seo'
import { TbDeviceImacDollar } from 'react-icons/tb'
import { genericPage } from './definePageType'

export const paidLandingPage = {
  ...genericPage,
  name: 'paidLandingPage',
  title: 'Paid Landing Page',
  icon: TbDeviceImacDollar,
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'go',
        includeSlugPrefixInStoredValue: true,
      },
    },
  ],
}
