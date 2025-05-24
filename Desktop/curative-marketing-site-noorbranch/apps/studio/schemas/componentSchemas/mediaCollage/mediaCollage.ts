import { CommentIcon } from '@sanity/icons'

import { definePageComponent } from '../definePageComponent'

import { PreviewMediaCollage } from './PreviewMediaCollage'

import { defineField } from 'sanity'

export const mediaCollage = definePageComponent({
  name: 'mediaCollage',
  title: 'Media Collage',
  description: 'Media Collage',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(3)
          .error('You must provide 3 images.'),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: 'Media Collage',
        images,
      }
    },
  },
  components: {
    preview: PreviewMediaCollage,
  },
})
