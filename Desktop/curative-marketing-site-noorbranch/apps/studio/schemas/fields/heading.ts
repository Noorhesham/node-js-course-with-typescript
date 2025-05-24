import { TEXT_SIZES } from '@/lib'
import { defineField } from 'sanity'

export const heading = defineField({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fieldsets: [
    {
      name: 'settings',
      title: 'Heading settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'colorablePlainText',
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
    }),
    defineField({
      name: 'headingWeight',
      title: 'Heading Weight',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Normal', value: 'normal' },
          { title: 'Medium', value: 'medium' },
          { title: 'Semibold', value: 'semibold' },
          { title: 'Bold', value: 'bold' },
        ],
      },
      fieldset: 'settings',
    }),
    defineField({
      name: 'headingSize',
      title: 'Heading Size',
      type: 'string',
      options: {
        list: TEXT_SIZES,
      },
      fieldset: 'settings',
    }),
  ],
  initialValue: {
    headingLevel: 'h2',
    headingSize: '5xl',
    headingWeight: 'medium',
  },
})
