import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const stat = defineField({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'minimalRichText',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      description:
        "The company this stat is related to. This is used to grab the companie's logo.",
      type: 'reference',
      to: [{ type: 'company' }],
    }),
  ],
  preview: {
    select: {
      value: 'value',
      description: 'description',
      logo: 'company.logotype.default',
    },
    prepare: ({ value, description, logo }) => {
      const subtitle = blockPreview(description)
      return {
        title: value,
        subtitle,
        media: logo,
      }
    },
  },
})
