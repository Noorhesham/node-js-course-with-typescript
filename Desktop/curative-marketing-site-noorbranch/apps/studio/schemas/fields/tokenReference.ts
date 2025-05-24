import { TokenIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { defineCalloutUIField } from '../utilities'

export const tokenReference = defineField({
  name: 'tokenReference',
  title: 'Token',
  type: 'object',
  icon: TokenIcon,
  fields: [
    defineField({
      name: 'token',
      type: 'reference',
      to: [{ type: 'token' }],
    }),
    defineCalloutUIField({
      heading: "What's a token?",
      body: "A token is a reusable piece of plain text that can be used in multiple places. They're great for things like phone numbers, addresses, or other pieces of text that are used in multiple places and might need to be edited later.",
    }),
  ],
  preview: {
    select: {
      title: 'token.variable',
    },
  },
})
