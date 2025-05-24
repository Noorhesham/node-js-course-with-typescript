import { LinkIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const anchorLink = defineField({
  name: 'anchorLink',
  title: 'Anchor Link',
  icon: LinkIcon,
  type: 'object',
  options: {
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      description: 'Select a section ID to link to on the current page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: 'Descriptive text for screen readers',
      type: 'string',
    }),
  ],
})
