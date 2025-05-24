import { defineField } from 'sanity'
import { StarIcon } from '@sanity/icons'
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
      name: 'title',
      title: 'Override Title',
      type: 'text',
      rows: 2,
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
      name: 'stippledSvg',
      title: 'Stippled SVG',
      type: 'image',
    }),
    defineField({
      name: 'hoverStippledSvg',
      title: 'Hover Stippled SVG',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'Client Story',
      subheading: 'clientStory.title',
    },
    prepare({ title, subheading }) {
      return {
        title,
        subheading,
      }
    },
  },
})
