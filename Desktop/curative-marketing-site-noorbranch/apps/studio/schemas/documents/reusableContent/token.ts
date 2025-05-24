import { TokenIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const token = defineType({
  name: 'token',
  title: 'Token',
  icon: TokenIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'A descriptive name for this token',
      type: 'string',
    }),
    defineField({
      name: 'variable',
      title: 'Variable',
      description: 'The actual value of the token',
      type: 'string',
    }),
  ],
})
