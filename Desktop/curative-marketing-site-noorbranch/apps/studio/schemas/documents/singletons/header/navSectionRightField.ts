import { defineField } from 'sanity'
import { navItemListField } from './navItemListField'
import { headerFeaturedContentCard } from './headerFeaturedContentCard'

export const navSectionRightField = defineField({
  name: 'right',
  title: 'Right',
  description:
    'The right side of the subnav. This contains either lists of nav items or a featured content card.',
  type: 'object',
  options: {
    collapsible: true,
  },
  hidden: ({ parent }) => !parent?.hasSubNav,
  group: 'subNav',
  fields: [
    defineField({
      name: 'navItemLists',
      title: 'Nav Item Lists',
      type: 'array',
      of: [navItemListField, headerFeaturedContentCard],
    }),
  ],
})
