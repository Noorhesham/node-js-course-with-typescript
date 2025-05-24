import { icon } from '@/schemas/fields/icon'
import { UlistIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { PreviewList } from './PreviewList'

export const list = defineField({
  name: 'listEmbed',
  title: 'List',
  icon: UlistIcon,
  description: 'A list of items, including heading, description, and icons.',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              description: 'This will only be shown if the list is vertical.',
              type: 'minimalRichText',
            }),
            icon,
          ],
        },
      ],
    }),
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: ['vertical', 'horizontal'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vertical',
    }),
  ],
  preview: {
    select: {
      items: 'items',
      direction: 'direction',
    },
  },
  components: {
    // @ts-expect-error
    preview: PreviewList,
  },
})
