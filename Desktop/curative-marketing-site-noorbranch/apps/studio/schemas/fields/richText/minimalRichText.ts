// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { tokenReference } from '@/schemas/fields/tokenReference'
import { defineArrayMember, defineType } from 'sanity'

export const minimalRichText = defineType({
  name: 'minimalRichText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      of: [tokenReference],
      styles: [],
      lists: [],
      marks: {
        annotations: [],
        decorators: [
          {
            title: 'Underline',
            value: 'underline',
          },
        ],
      },
    }),
  ],
})
