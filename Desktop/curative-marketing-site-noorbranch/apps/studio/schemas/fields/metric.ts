import { defineField } from 'sanity'

export const metric = defineField({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  options: {
    columns: 2,
  },
  preview: {
    select: {
      title: 'value',
      subtitle: 'description',
    },
  },
})
