// –------------------------------------------------
// COMPLEX RICH TEXT (field)
//
// Contains the body content for blog posts on the site.
//
// –------------------------------------------------

import { defineArrayMember, defineType } from 'sanity'

import { imageGallery } from '@/schemas/componentSchemas/imageGallery'
import { ctaCard } from '@/schemas/fields/ctaCard'
import { codeSnippet } from '@/schemas/fields/codeSnippet'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { richImage } from '@/schemas/fields/richImage'
import { tokenReference } from '@/schemas/fields/tokenReference'

export const blogRichText = defineType({
  name: 'blogRichText',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // These blocks can be added inline with text in the editor
      of: [tokenReference],
      // This config limits the styles that can be applied to text in the editor
      // Specifically, this removes the default H1 option to avoid conflict
      // with the blog post title.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Heading 5', value: 'h5' },
        { title: 'Heading 6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        annotations: [link, internalLink],
      },
    }),
    richImage,
    ctaCard,
    imageGallery,
    defineArrayMember(codeSnippet),
    defineArrayMember({
      name: 'testimonialReference',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineArrayMember({
      name: 'videoReference',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
  ],
})
