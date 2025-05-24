// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { imageBlock } from '@/schemas/componentSchemas/imageBlock'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { defineArrayMember, defineType } from 'sanity'

export const simpleRichText = defineType({
  name: 'simpleRichText',
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
      },
    }),
    imageBlock,
  ],
})
