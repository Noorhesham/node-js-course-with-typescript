import { LaunchIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'

export const globalLink = defineField({
  name: 'link',
  title: 'Link',
  icon: LaunchIcon,
  type: 'object',
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
    {
      ...link,
      hidden: ({ parent }) => parent?.actionType !== 'link',
      validation: (Rule) =>
        Rule.warning().custom((value, context) => {
          const parent = context.parent as { actionType: string }
          const field = value as { href: string }

          if (parent.actionType === 'link' && !field?.href) {
            return 'This link will not be work as expected because no URL is set'
          }

          if (parent.actionType !== 'link' && field?.href) {
            return 'This link will not be used because the action type is not set to "Link"'
          }

          return true
        }),
    },

    // Internal Link
    {
      ...internalLink,
      hidden: ({ value, parent }) => {
        const field = value as { reference: unknown }

        return (
          parent?.actionType !== 'internalLink' && !field?.reference
        )
      },
      validation: (Rule) =>
        Rule.warning().custom((value, context) => {
          const parent = context.parent as { actionType: string }

          const field = value as { reference: unknown }

          if (
            parent.actionType === 'internalLink' &&
            !field?.reference
          ) {
            return 'This internal link will not work as expected because no document is selected'
          }

          if (
            parent.actionType !== 'internalLink' &&
            field?.reference
          ) {
            return 'This internal link will not be used because the action type is not set to "Internal Link"'
          }

          return true
        }),
    },
  ],
});
