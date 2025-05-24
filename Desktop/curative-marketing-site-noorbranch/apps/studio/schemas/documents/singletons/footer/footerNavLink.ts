import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { LinkIcon } from '@sanity/icons'
import { FaHeading } from 'react-icons/fa'
import { defineField } from 'sanity'

export const footerNavLink = defineField({
  name: 'footerNavLink',
  title: 'Footer Nav Link',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Link', value: 'internalLink' },
          { title: 'Link', value: 'link' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'internalLink',
    }),
    defineField({
      name: 'isHeading',
      title: 'Is Heading?',
      description: 'If checked, this item will be rendered as a heading.',
      type: 'boolean',
      initialValue: false,
    }),
    {
      ...link,
      hidden: ({ parent }) => parent?.type !== 'link',
    },
    {
      ...internalLink,
      hidden: ({ parent }) => parent?.type !== 'internalLink',
    },
  ],
  preview: {
    select: {
      text: 'text',
      type: 'type',
      isHeading: 'isHeading',
    },
    prepare({ text, type, isHeading }) {
      const subtitle = [
        isHeading ? 'Heading | ' : '',
        type === 'internalLink'
          ? 'Internal Link'
          : type === 'link'
            ? 'Link'
            : 'No link',
      ].join('')

      const media = isHeading ? FaHeading : LinkIcon

      return {
        title: text,
        subtitle,
        media,
      }
    },
  },
})
