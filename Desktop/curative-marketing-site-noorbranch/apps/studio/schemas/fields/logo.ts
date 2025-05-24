// –------------------------------------------------
// LOGO (field)
//
// This custom field type consolidates the different versions
// of a brand asset such as a logo or icon. It includes the
// versions for light and dark backgrounds, and an option to
// specify the default version.
//
// –------------------------------------------------

import { defineField } from 'sanity'

export const logo = defineField({
  name: 'logo',
  title: 'Logo',
  type: 'object',
  fields: [
    defineField({
      name: 'onLight',
      title: 'On Light',
      type: 'image',
    }),
    defineField({
      name: 'onDark',
      title: 'On Dark',
      type: 'image',
    }),
    defineField({
      name: 'default',
      title: 'Default',
      type: 'image',
    }),
  ],
})
