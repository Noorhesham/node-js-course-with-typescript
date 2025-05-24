import { PiSquareHalfBottomDuotone } from 'react-icons/pi'
import { defineField, defineType } from 'sanity'
import { socialLink } from '../../../objects/socialLink'
import { navColumn } from './navColumn'

export const footer = defineType({
  name: 'footer',
  title: 'Global Footer Settings',
  icon: PiSquareHalfBottomDuotone,
  type: 'document',
  fields: [
    defineField({
      name: 'navColumns',
      title: 'Navigation Columns',
      type: 'array',
      of: [navColumn],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Add social media links to display in the footer',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
  ],
  preview: {
    select: {
      title: 'settingsDocumentName',
    },
    prepare: ({ title }) => ({
      title: title || 'Global Footer Settings',
    }),
  },
})
