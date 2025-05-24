import { AddCommentIcon, CommentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { PreviewFeaturedTestimonial } from './PreviewFeaturedTestimonial'

export const featuredTestimonial = defineField({
  name: 'featuredTestimonial',
  title: 'Testimonial',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'testimonial',
      type: 'reference',
      icon: AddCommentIcon,
      to: [{ type: 'testimonial' }],
    }),
  ],
  preview: {
    select: {
      testimonial: 'testimonial',
      body: 'testimonial.body',
      authorFirstName: 'testimonial.author.firstName',
      authorLastName: 'testimonial.author.lastName',
      authorRole: 'testimonial.author.role',
      authorCompany: 'testimonial.author.company',
      attributionDetails: 'testimonial.attributionDetails',
    },
  },
  components: {
    // @ts-ignore
    preview: PreviewFeaturedTestimonial,
  },
})
