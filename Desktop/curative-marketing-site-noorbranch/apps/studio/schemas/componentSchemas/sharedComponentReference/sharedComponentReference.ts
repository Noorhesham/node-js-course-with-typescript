import { ComponentIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const sharedComponentReference = defineField({
  name: 'sharedComponentReference',
  title: 'Shared Component',
  icon: ComponentIcon,
  type: 'reference',
  to: [{ type: 'sharedComponent' }],
})
