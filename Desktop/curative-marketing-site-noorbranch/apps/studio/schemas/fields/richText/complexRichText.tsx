// –------------------------------------------------
// COMPLEX RICH TEXT (field)
//
// Contains the body content for blog posts on the site.
//
// –------------------------------------------------

import { ComponentIcon } from '@sanity/icons'
import { GoHorizontalRule } from 'react-icons/go'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageGallery } from '@/schemas/componentSchemas/imageGallery'
import { conversionPanel } from '@/schemas/componentSchemas/modules/conversionPanel'
import { testimonialCard } from '@/schemas/componentSchemas/modules/testimonialCard/testimonialCard'
import { trustBar } from '@/schemas/componentSchemas/modules/trustBar/trustBar'
import { PreviewReusableContent } from '@/schemas/documents/reusableContent/PreviewReusableContent'
import { anchor } from '@/schemas/fields/anchor'
import { codeSnippet } from '@/schemas/fields/codeSnippet'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { richImage } from '@/schemas/fields/richImage'
import { tokenReference } from '@/schemas/fields/tokenReference'

export const complexRichText = defineType({
  name: 'complexRichText',
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
        decorators: [
          {title: 'Strong', value: 'strong', blockEditor: { render: props => props.parent?.style?.startsWith('h') ? props.children : <strong>{props.children}</strong> }},
          {title: 'Emphasis', value: 'em'}
        ]
      },
    }),
    richImage,
    imageGallery,
    trustBar,
    testimonialCard,
    defineArrayMember({
      name: 'videoReference',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
    anchor,
    conversionPanel,
    defineArrayMember(codeSnippet),
    defineArrayMember({
      name: 'sharedModule',
      title: 'Shared Module',
      icon: ComponentIcon,
      type: 'reference',
      to: [{ type: 'sharedModule' }],
      components: {
        preview: PreviewReusableContent,
      },
    }),
  ],
})
