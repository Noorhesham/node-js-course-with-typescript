import { seo } from '@/schemas/fields/seo'
import { TbDeviceImacDollar } from 'react-icons/tb'
import { genericListingPage } from './defineListingPageType'

export const listingPage = {
  ...genericListingPage,
  name: 'listingPage',
  title: 'Listing Page',
  icon: TbDeviceImacDollar,
  fields: [...genericListingPage.fields, seo],
}
