import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
      // Required if overrideAttribution is false
      validation: (Rule) =>
        Rule.error().custom((field, context) => {
          const parent = context.parent as
            | { overrideAttribution: boolean }
            | undefined

          if (!parent?.overrideAttribution && !field) {
            return 'Author is required if you do not override attribution details'
          }

          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
  ],
  preview: {
    select: {
      body: 'body',
      firstName: 'author.firstName',
      lastName: 'author.lastName',
      authorTitle: 'author.title',
      attributionDetails: 'attributionDetails',
    },
    prepare({ body, firstName, lastName, attributionDetails }) {
      const subtitle =
        attributionDetails || [firstName, lastName].filter(Boolean).join(' ')
      
    return {
        title: blockPreview(body),
        subtitle,
      }
    },
  },
})
