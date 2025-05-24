// –------------------------------------------------
// Blog Categories (field)
//
// Used to create a group of categories fields in
// multiple contexts across the site.
//
// –------------------------------------------------

import { defineField } from 'sanity'

export const clientStoryCategories = defineField({
  name: 'clientStoryCategories',
  title: 'Client Story Categories',
  type: 'object',
  group: 'categories',
  fields: [
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      description:
        'Select one or more relevant Use Cases so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'useCase' },
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
      title: 'Industry',
      description: 'This is the industry of client.',
      type: 'reference',
      to: { type: 'industry' },
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'technology',
      title: 'Technology',
      description: 'This is the technology used with client.',
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
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      description:
        'Select one or more relevant Solutions so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'solution' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'string',
      options: {
        list: [
          { title: 'Website Redesign', value: 'website-redesign' },
          { title: 'Ongoing Website Management', value: 'ongoing-website-mgt' },
        ],
      },
    }),
  ],
})

/**
 * Filter function for category fields
 */
function categoryFilterFn({ document, parentPath }) {
  // Prevent duplicates from showing
  const fieldValue = parentPath.reduce((obj, path) => obj[path], document)
  const refs = fieldValue.reduce((refArr, { _ref }) => {
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
