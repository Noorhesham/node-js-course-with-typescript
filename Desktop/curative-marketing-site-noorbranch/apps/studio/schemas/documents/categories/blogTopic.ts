import { PAGE_TYPES } from '@/lib'
import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blogTopic = defineType({
  name: 'blogTopic',
  title: 'Blog Topic',
  type: 'document',
  icon: TagIcon,
  options: {
    sanityCreate: {
      exclude: true
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      description: 'Unique part of the url for this category',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedPage',
      title: 'Related Page',
      description:
        'The page that this category is associated with, if any. Clicking on this category will take the user to this page in some contexts.',
      type: 'reference',
      to: PAGE_TYPES.map((page) => ({ type: page })),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
