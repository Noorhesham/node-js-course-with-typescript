// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { richImage } from '@/schemas/fields/richImage'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { defineArrayMember, defineType } from 'sanity'

export const simpleRichTextWithImages = defineType({
  name: 'simpleRichTextWithImages',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      of: [tokenReference],
      // This config limits the styles can be applied to text in the editor
      // Specifically, this removes the default H1 option to avoid conflict
      // with the blog post title.
      styles: [],
      marks: {
        annotations: [link, internalLink],
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
          },
          {
            title: 'Underline',
            value: 'underline',
          },
          {
            title: 'Code',
            value: 'code',
          },
        ],
      },
    }),
    richImage,
  ],
})
