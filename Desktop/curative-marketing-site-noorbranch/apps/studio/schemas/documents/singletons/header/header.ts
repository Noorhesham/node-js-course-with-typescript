import { ControlsIcon, EditIcon } from '@sanity/icons'
import { RiLayoutTopLine } from 'react-icons/ri'
import { defineField, defineType } from 'sanity'

import { topNavItemField } from './topNavItemField'

export const header = defineType({
  name: 'globalHeader',
  title: 'Global Header Settings',
  type: 'document',
  icon: RiLayoutTopLine,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: ControlsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'left',
      title: 'Left Side',
      type: 'array',
      of: [topNavItemField],
      group: 'content',
    }),
    defineField({
      name: 'right',
      title: 'Right Side',
      type: 'array',
      of: [topNavItemField],
      group: 'content',
    }),
    defineField({
      name: 'settingsDocumentName',
      title: 'Settings Document Name',
      type: 'string',
      group: 'settings',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'settingsDocumentName',
    },
    prepare: ({ title }) => ({
      title: title || 'Global Header Settings',
    }),
  },
})
