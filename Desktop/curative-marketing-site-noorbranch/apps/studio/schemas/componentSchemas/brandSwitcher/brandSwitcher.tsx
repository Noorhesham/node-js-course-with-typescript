import { defineField } from 'sanity'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { definePageComponent } from '../definePageComponent'
import { PreviewBrandSwitcher } from './PreviewBrandSwitcher'

export const brandSwitcher = definePageComponent({
  name: 'brandSwitcher',
  title: 'Brand Switcher',
  description: 'Brand Switcher',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.max(100).warning('Heading should be concise'),
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
      validation: (Rule) => Rule.max(100).warning('Heading should be concise'),
    }),
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(15),
      of: [
        defineField({
          name: 'brand',
          title: 'Brand',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
            }),
            defineField({
              name: 'link',
              title: 'Link',
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
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      subhead: 'subhead',
      brands: 'brands',
    },
    prepare: ({ heading, subhead, brands }) => {
      return {
        title: heading,
        heading,
        subhead,
        brands,
      }
    },
  },
  components: {
    preview: PreviewBrandSwitcher,
  },
})
