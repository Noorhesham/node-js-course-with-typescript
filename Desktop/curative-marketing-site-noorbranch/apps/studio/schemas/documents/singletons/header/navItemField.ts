import { CARD_COLOR_OPTIONS, ITEM_TYPE_OPTIONS } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineField } from 'sanity'

export const navItemField = defineField({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'column',
      title: 'Column Index',
      type: 'number',
      initialValue: 1
    }),
    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      options: {
        list: ITEM_TYPE_OPTIONS,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'actionType',
          title: 'Link Type',
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

            return parent?.actionType !== 'internalLink' && !field?.reference
          },
          validation: (Rule) =>
            Rule.warning().custom((value, context) => {
              const parent = context.parent as { actionType: string }

              const field = value as { reference: unknown }

              if (parent.actionType === 'internalLink' && !field?.reference) {
                return 'This internal link will not work as expected because no document is selected'
              }

              if (parent.actionType !== 'internalLink' && field?.reference) {
                return 'This internal link will not be used because the action type is not set to "Internal Link"'
              }

              return true
            }),
        },
      ],
      hidden: ({ parent }) => parent?.itemType === 'heading',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    icon,
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }],
      hidden: ({ parent }) => parent?.itemType !== 'person',
    }),
    defineField({
      name: 'cardColor',
      title: 'Card Color',
      type: 'string',
      options: {
        list: CARD_COLOR_OPTIONS,
      },
      hidden: ({ parent }) => parent?.itemType !== 'stage',
    }),
  ],
})
