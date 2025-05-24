import { defineField } from 'sanity'

import { EYEBROW_COLORS, TEXT_SIZES } from '@/lib'
import { icon } from '@/schemas/fields/icon'

export const eyebrow = defineField({
  name: 'eyebrow',
  title: 'Eyebrow',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fieldsets: [
    {
      name: 'settings',
      title: 'Eyebrow settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'minimalRichText',
    }),
    {
      ...icon,
      fieldset: 'settings',
    },
    defineField({
      name: 'customIcon',
      title: 'Custom Icon',
      type: 'image',
      fieldset: 'settings',
    }),
    defineField({
      name: 'color',
      title: 'Customize Color',
      type: 'simplerColor',
      options: {
        collapsible: false,
        colorList: EYEBROW_COLORS,
      },
      fieldset: 'settings',
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      options: {
        list: [
          {title: 'TT Fors', value: 'tt-fors'},
          {title: 'Share Tech Mono', value: 'share-tech-mono'},
        ],
      },
      initialValue: 'share-tech-mono',
      fieldset: 'settings',
    }),
    defineField({
      name: 'headingLevel',
      title: 'Heading Level',
      type: 'string',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'H5', value: 'h5' },
          { title: 'H6', value: 'h6' },
        ],
      },
      fieldset: 'settings',
      initialValue: 'h4',
    }),

  ],
})
