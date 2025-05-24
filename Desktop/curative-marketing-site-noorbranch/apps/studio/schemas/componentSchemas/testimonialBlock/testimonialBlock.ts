import { CommentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewTestimonialBlock } from './PreviewTestimonialBlock'

export const testimonialBlock = definePageComponent({
  name: 'testimonialBlock',
  title: 'Testimonial Block',
  description: 'A block showing a testimonial',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
      testimonial: 'testimonial',
    },
    prepare: ({ internalName, testimonial }) => {
      return {
        title: `${internalName} | Testimonial Block`,
        testimonial,
      }
    },
  },
  components: {
    preview: PreviewTestimonialBlock,
  },
})
