import { CommentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewTestimonialSlider } from './PreviewTestimonialSlider'

export const testimonialSlider = definePageComponent({
  name: 'testimonialSlider',
  title: 'Testimonial Slider',
  description: 'A slider showing testimonials',
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
  ],
  preview: {
    select: {
      testimonials: 'testimonials',
    },
    prepare: ({ testimonials }) => {
      return {
        title: 'Testimonial Slider',
        testimonials,
      }
    },
  },
  components: {
    preview: PreviewTestimonialSlider,
  },
})
