import { BsMap } from 'react-icons/bs'
import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'

export const mapComponent = definePageComponent({
  name: 'mapComponent',
  title: 'Map Componnent',
  description: 'Map Componnent',
  icon: BsMap,
  fields: [
    defineField({
      name: 'center',
      title: 'Map Center',
      type: 'geopoint',
    }),
    defineField({
      name: 'textBlockList',
      title: 'Text Block List',
      type: 'array',
      of: [
        defineField({
          name: 'textBlock',
          title: 'Text Block',
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
              type: 'simpleRichText',
            }),
          ]
        }),
      ]
    }),
  ],
  preview: {
    select: {
      textBlockList: 'textBlockList',
    },
    prepare: ({ textBlockList }) => ({
      title: textBlockList?.[0]?.heading,
    }),
  },
})
