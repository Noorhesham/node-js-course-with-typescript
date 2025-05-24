import { ctaAction } from '@/schemas/fields/ctaAction'
import { icon } from '@/schemas/fields/icon'
import { defineField } from 'sanity'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
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
    {
      ...icon,
      hidden: ({ parent }) => parent.useCustomIcon,
      group: 'content',
    },
    defineField({
      name: 'useCustomIcon',
      title: 'Use Custom Icon?',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Icon',
      type: 'image',
      hidden: ({ parent }) => !parent.useCustomIcon,
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
      group: 'content',
    }),
    {
      ...ctaAction,
      name: 'cta',
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
            ],
          },
        }),
        ...ctaAction.fields,
      ],
    },
  ],
})
