import { CommentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewTestimonialPanel } from './PreviewTestimonialPanel'

export const testimonialPanel = definePageComponent({
  name: 'testimonialPanel',
  title: 'Testimonial Panel',
  description: 'A panel showing 1 or more testimonials',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [{ title: 'Cards', value: 'cards' }],
      },
      initialValue: 'cards',
      hidden: ({ parent }) => {
        return !parent.testimonials || parent.testimonials?.length < 2
      },
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      subheading: 'subheading',
      testimonials: 'testimonials',
    },
    prepare: ({ heading, subheading, testimonials }) => {
      return {
        title: 'Testimonial Panel',
        heading,
        subheading,
        testimonials,
      }
    },
  },
  components: {
    preview: PreviewTestimonialPanel,
  },
})
