import { StarIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { richImage } from '@/schemas/fields/richImage'

export const clientStoryItem = defineField({
  name: 'clientStoryItem',
  title: 'Client Story Item',
  icon: StarIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'clientStory',
      title: 'Client Story',
      type: 'reference',
      to: [{ type: 'clientStory' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Override Excerpt',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'clientStory.title',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
})
