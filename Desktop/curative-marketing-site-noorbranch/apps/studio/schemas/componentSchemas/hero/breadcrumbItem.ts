import { defineField } from 'sanity'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'

export const breadcrumbItem = defineField({
  name: 'breadcrumbItem',
  title: 'Breadcrumb Item',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      ...internalLink,
      name: 'link',
    },
  ],
})
