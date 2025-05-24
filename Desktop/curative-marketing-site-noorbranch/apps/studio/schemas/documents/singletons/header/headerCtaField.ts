import { BUTTON_STYLES } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { defineField } from 'sanity'

export const headerCtaField = defineField({
  name: 'cta',
  title: 'Footer CTA',
  type: 'object',
  options: {
    collapsible: false,
  },
  groups: [
    {
      name: 'basics',
      title: 'Basics',
      default: true,
    },
    {
      name: 'style',
      title: 'Style',
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: BUTTON_STYLES,
      },
      initialValue: 'primary',
      group: 'style',
    }),
    {
      ...icon,
      group: 'style',
    },
  ],
})
