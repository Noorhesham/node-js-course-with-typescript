import { ctaAction } from '@/schemas/fields/ctaAction'
import { ArrowRightIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const ctaCard = defineField({
  name: 'ctaCard',
  title: 'CTA Card',
  icon: ArrowRightIcon,
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        {
          ...ctaAction,
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
                  { title: 'Email Capture', value: 'emailCapture' },
                ],
              },
            }),
            ...ctaAction.fields,
          ],
        },
      ],
      validation: (Rule) => [
        Rule.error().custom((field?: unknown[]) => {
          if (!field || field.length < 1 || field.length > 2) {
            return 'A CTA must have either 1 or 2 actions'
          }
          return true
        }),
        // If the field includes an action where action.type === 'emailCapture', there must be only one action
        Rule.error().custom((field?: { type: string }[]) => {
          if (
            field?.some((action) => action.type === 'emailCapture') &&
            field.length > 1
          ) {
            return 'A CTA with an email capture action can only have one action.'
          }
          return true
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      body: 'body',
    },
    prepare: ({ heading, body }) => {
      const title = heading || blockPreview(body)
      return {
        title,
        subtitle: 'CTA',
        media: ArrowRightIcon,
      }
    },
  },
})
