import { seo } from '@/schemas/fields/seo'
import { genericPage } from './definePageType'

export const stagePage = {
  ...genericPage,
  name: 'stagePage',
  title: 'Stage Page',
  fields: [...genericPage.fields, seo],
}
