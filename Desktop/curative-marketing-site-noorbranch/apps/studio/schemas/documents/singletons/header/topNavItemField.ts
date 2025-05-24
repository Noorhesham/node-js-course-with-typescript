import { BUTTON_SIZE, BUTTON_STYLES } from '@/lib'
import { ControlsIcon, EditIcon } from '@sanity/icons'
import { BsMenuApp } from 'react-icons/bs'
import { defineField } from 'sanity'
import { navSectionLeftField } from './navSectionLeftField'
import { navSectionRightField } from './navSectionRightField'

export const topNavItemField = defineField({
  name: 'topNavItem',
  title: 'Top Nav Item',
  type: 'object',
  icon: BsMenuApp,
  groups: [
    {
      name: 'topLevel',
      title: 'Top Level',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'subNav',
      title: 'Sub Nav',
      icon: ControlsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'topLevel',
    }),
    defineField({
      name: 'navLink',
      title: 'Link',
      type: 'url',
      group: 'topLevel',
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: 'isButton',
      title: 'Styled as a button?',
      description: 'If true, the link will be styled as a button',
      type: 'boolean',
      initialValue: false,
      group: 'topLevel',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: BUTTON_STYLES,
      },
      initialValue: 'purple-600',
      hidden: ({ parent }) => !parent?.isButton,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isButton: boolean } | undefined

          if (parent?.isButton && !value) {
            return 'Button style is required if the link is styled as a button.'
          }

          return true
        }),
      group: 'topLevel',
    }),
    defineField({
      name: 'buttonSize',
      title: 'Button Size',
      type: 'string',
      options: {
        list: BUTTON_SIZE,
      },
      initialValue: 'md',
      hidden: ({ parent }) => !parent?.isButton,
      group: 'topLevel',
    }),
    defineField({
      name: 'hasSubNav',
      title: 'Has Sub Nav',
      type: 'boolean',
      initialValue: false,
      group: 'subNav',
    }),
    navSectionLeftField,
    navSectionRightField,
  ],
})
