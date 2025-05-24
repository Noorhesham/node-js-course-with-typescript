import { defineField } from 'sanity'

export const hubspotFormLogicItem = defineField({
  name: 'logic',
  title: 'Logic',
  type: 'object',
  fields: [
    defineField({
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
    }),
    defineField({
      name: 'progressiveFieldOptions',
      title: 'Progressive Field Options',
      type: 'string',
      options: {
        list: [
          { title: 'Leave field on the form', value: 'leave' },
          { title: 'Replace with queued progressive field', value: 'replace' },
        ],
      },
    }),
    defineField({
      name: 'dependentFields',
      title: 'Dependent Fields',
      type: 'array',
      of: [
        defineField({
          name: 'option',
          title: 'Option',
          type: 'number',
        }),
        defineField({
          name: 'filterValue',
          title: 'Filter Value',
          type: 'string',
        }),
        defineField({
          name: 'thenShow',
          title: 'Then Show',
          type: 'string',
        }),
      ],
    }),
  ],
})
