import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { PreviewImageGallery } from '@/schemas/componentSchemas/imageGallery/PreviewImageGallery'

export const imageGallery = defineField({
  name: 'imageGallery',
  title: 'Image Gallery',
  description: 'A gallery of images.',
  icon: ImageIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare: ({ images }) => ({
        title: 'Image Gallery',
        images,
      }),
  },
  components: {
    preview: PreviewImageGallery,
  },
})
