// –------------------------------------------------
// PUBLICATION DATES (field)
//
// This custom field type consolidates the dates when a piece of
// content was published and last updated.
//
// –------------------------------------------------

import { defineField } from 'sanity'

export const publicationDates = defineField({
  name: 'publicationDates',
  title: 'Publication Dates',
  type: 'object',
  options: {
    columns: 2,
  },
  fields: [
    {
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      description: 'The date and time this content was published.',
    },
    {
      name: 'updatedAt',
      title: 'Updated',
      type: 'datetime',
      description: 'The date and time this content was last updated.',
    },
  ],
})
