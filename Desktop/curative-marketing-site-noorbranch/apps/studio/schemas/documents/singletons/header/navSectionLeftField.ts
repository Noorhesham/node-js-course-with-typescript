import { defineField } from 'sanity'
import { MENU_TYPE_OPTIONS } from '@/lib'
import { navItemListField } from './navItemListField'
import { navSectionFooterField } from './navSectionFooterField'

export const navSectionLeftField = defineField({
  name: 'left',
  title: 'Left',
  type: 'object',
  options: {
    collapsible: true,
  },
  hidden: ({ parent }) => !parent?.hasSubNav,
  groups: [
    {
      name: 'navItems',
      title: 'Nav Items',
      default: true,
    },
    {
      name: 'footer',
      title: 'Footer',
    },
  ],
  group: 'subNav',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'navItems',
    }),
    defineField({
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: MENU_TYPE_OPTIONS,
      },
      group: 'navItems',
    }),
    defineField({
      name: 'navItemLists',
      title: 'Nav Item Lists',
      type: 'array',
      of: [navItemListField],
      group: 'navItems',
    }),
    navSectionFooterField,
  ],
})
