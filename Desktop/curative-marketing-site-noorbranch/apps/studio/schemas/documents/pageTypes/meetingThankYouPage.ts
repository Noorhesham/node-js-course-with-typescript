import { seo } from '@/schemas/fields/seo'
import { PiHandsPrayingDuotone } from 'react-icons/pi'
import { genericPage } from './definePageType'

export const meetingThankYouPage = {
  ...genericPage,
  name: 'meetingThankYouPage',
  title: 'Meeting Thank You Page',
  icon: PiHandsPrayingDuotone,
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: '',
        includeSlugPrefixInStoredValue: true,
      },
    },
  ],
}
