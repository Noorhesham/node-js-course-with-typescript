import { defineField, defineType } from 'sanity'

export const redirects = defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Redirect',
            value: 'redirect',
          },
          {
            title: 'Rewrite',
            value: 'rewrite',
          },
        ],
      },
      initialValue: 'redirect',
    }),

    defineField({
      name: 'source',
      title: 'Source URL',
      type: 'string',
      description: 'The original URL to redirect from.',
    }),

    defineField({
      name: 'destination',
      title: 'Destination URL',
      type: 'string',
      description: 'The target URL to redirect to.',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'keyValuePairs',
          title: 'Key-Value Pairs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Type is required.'),
                },
                {
                  name: 'key',
                  title: 'Key',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Key is required.'),
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'permanent',
      title: 'Permanent Redirect',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'source',
      subtitle: 'destination',
      media: 'icon',
    },
    prepare({ title, subtitle }) {
      return {
        title: `From: ${title}`,
        subtitle: `To: ${subtitle}`,
      }
    },
  },
})
