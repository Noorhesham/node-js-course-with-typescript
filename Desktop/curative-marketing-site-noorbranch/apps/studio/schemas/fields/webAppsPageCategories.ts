// –------------------------------------------------
// Blog Categories (field)
//
// Used to create a group of categories fields in
// multiple contexts across the site.
//
// –------------------------------------------------

import { defineField } from 'sanity'

export const webAppsPageCategories = defineField({
  name: 'webAppsPageCategories',
  title: 'Web Apps Page Categories',
  type: 'object',
  group: 'categories',
  fields: [
    defineField({
      name: 'webAppCategories',
      title: 'webAppCategories',
      description:
        'Select one or more relevant Use Cases so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'webAppCategory' },
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
