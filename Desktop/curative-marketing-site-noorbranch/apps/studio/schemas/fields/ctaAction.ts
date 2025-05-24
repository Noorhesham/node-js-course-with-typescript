import { BUTTON_SIZES, BUTTON_STYLES, LinkType } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { anchorLink } from '@/schemas/fields/linkTypes/anchorLink'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineField } from 'sanity'

export type CtaActionType = LinkType

export const ctaAction = defineField({
  name: 'ctaAction',
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

    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: BUTTON_STYLES,
      },
      initialValue: 'blue-fill',
    }),

    defineField({
      name: 'buttonSize',
      title: 'Button Size',
      type: 'string',
      options: {
        list: BUTTON_SIZES,
      },
      initialValue: 'lg',
    }),
    icon,
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: ['leading', 'trailing'],
      },
      initialValue: 'trailing',
      hidden: ({ parent }) => !parent?.icon,
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
