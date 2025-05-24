import { CommentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewImageWall } from './PreviewImageWall'

export const imageWall = definePageComponent({
  name: 'imageWall',
  title: 'Photo Wall',
  description: 'Image wall',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: 'Photo Wall',
        images,
      }
    },
  },
  components: {
    preview: PreviewImageWall,
  },
})
