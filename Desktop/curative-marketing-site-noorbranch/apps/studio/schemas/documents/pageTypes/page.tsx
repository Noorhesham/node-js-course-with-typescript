import { seo } from '@/schemas/fields/seo'
import { PiTarget } from 'react-icons/pi'
import { genericPage } from './definePageType'

export const page = {
  ...genericPage,
  icon: PiTarget,
  fields: [...genericPage.fields, seo],
}
