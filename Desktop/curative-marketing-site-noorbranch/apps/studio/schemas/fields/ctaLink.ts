import { LinkType } from '@/lib'
import { anchorLink } from '@/schemas/fields/linkTypes/anchorLink'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineField } from 'sanity'

export type ctaLink = LinkType

export const ctaLink = defineField({
  name: 'ctaLink',
  title: 'CTA',
  type: 'object',
  fields: [
    // Action Type gets spread in here from the parent

    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),

    // ACTION TYPES
    // Link
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

    // Anchor Link
    {
      ...anchorLink,
      hidden: ({ parent }) => parent?.actionType !== 'anchorLink',
      validation: (Rule) =>
        Rule.warning().custom((value, context) => {
          const parent = context.parent as { actionType: string }
          const field = value as { sectionId: string }

          if (parent.actionType === 'anchorLink' && !field?.sectionId) {
            return 'This anchor link will not work as expected because no Section ID is set'
          }

          if (parent.actionType !== 'anchorLink' && field?.sectionId) {
            return 'This anchor link will not be used because the action type is not set to "Anchor Link"'
          }

          return true
        }),
    },


  ],
  preview: {
    select: {
      actionType: 'actionType',
      buttonText: 'buttonText',
    },
    prepare: ({ actionType, buttonText }) => {
      const subtitle =
        actionType === 'emailCapture'
          ? 'Email Capture'
          : actionType === 'download'
            ? 'Download'
            : 'Link'
      return {
        title: buttonText,
        subtitle,
      }
    },
  },
})
