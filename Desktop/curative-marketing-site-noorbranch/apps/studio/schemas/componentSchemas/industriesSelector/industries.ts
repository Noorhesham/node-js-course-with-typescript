import { defineField } from 'sanity'
import { ctaLink } from '@/schemas/fields/ctaLink'
import { CaseIcon } from '@sanity/icons'

export const industries = defineField({
  name: 'industries',
  title: 'Industries',
  description: 'Selector for Industries',
  type: 'object',
  icon: CaseIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'cta',
      title: 'CTA',
    },
  ],
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'featureimage1',
      title: 'Featured Image1',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'featureimage2',
      title: 'Featured Image2',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'numberofclients',
      title: 'Number of clients',
      type: 'number',
      group: 'content',
    }),
    {
      ...ctaLink,
      name: 'link',
      title: 'Link',
      group: 'cta',
      fields: [
        defineField({
          name: 'actionType',
          title: 'CTA Type',
          type: 'string',
          initialValue: 'internalLink',
          options: {
            list: [
              { title: 'External Link', value: 'link' },
              { title: 'Internal Link', value: 'internalLink' },
              { title: 'Download', value: 'download' },
              { title: 'Play Video', value: 'playVideo' },
            ],
          },
        }),
        ...ctaLink.fields,
      ],
    },
  ],
})
