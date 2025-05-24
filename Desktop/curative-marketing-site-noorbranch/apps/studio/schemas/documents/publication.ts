// –------------------------------------------------
//
// PUBLICATION (document)
//
// Information about a news organization assoicated
// with news listings.
//
// –------------------------------------------------

import { CaseIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  icon: CaseIcon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
})
