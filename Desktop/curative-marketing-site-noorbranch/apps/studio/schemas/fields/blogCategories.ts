// –------------------------------------------------
// Blog Categories (field)
//
// Used to create a group of categories fields in
// multiple contexts across the site.
//
// –------------------------------------------------

import { defineField } from 'sanity'

import type { SanityDocument } from '@sanity/client'

interface CategoryFilterParams {
  document: SanityDocument
  parentPath: string[]
}

export const blogCategories = defineField({
  name: 'blogCategories',
  title: 'Blog Categories',
  type: 'object',
  group: 'categories',
  fields: [
    defineField({
      name: 'blogTopic',
      title: 'Blog Topic',
      description: 'Select the primary topic for this content',
      type: 'reference',
      to: { type: 'blogTopic' },
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'blogTags',
      title: 'Blog Tags',
      description: 'Add relevant tags to help users find this content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'blogTag' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'industry',
      title: 'Industries',
      description: 'Select the relevant industries for this content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'industry' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'technology',
      title: 'Technologies',
      description: 'Select the relevant technologies for this content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'technology' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
})

/**
 * Filter function for category fields
 */
function categoryFilterFn({ document, parentPath }: CategoryFilterParams) {
  // Prevent duplicates from showing
  const fieldValue = parentPath.reduce(
    (obj: any, path: any) => obj[path],
    document,
  )
  const refs = fieldValue.reduce((refArr: any, { _ref }: { _ref: any }) => {
    _ref && refArr.push(_ref)
    return refArr
  }, [])

  return {
    filter: '!(_id in $refs)',
    params: {
      refs,
    },
  }
}
