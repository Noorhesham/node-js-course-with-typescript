import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'
import { PreviewMediaSlider } from './PreviewMediaSlider'

export const mediaSlider = definePageComponent({
  name: 'mediaSlider',
  title: 'Media Slider',
  description: 'A slider of images.',
  icon: ImageIcon,
  preview: {
    select: {
      mediaList: 'mediaList'
    },
    prepare: ({ mediaList = [] }) => ({
      title: 'Media Slider',
      mediaList
    })
  },
  components: {
    preview: PreviewMediaSlider
  },
  fields: [
    defineField({
      name: 'mediaList',
      title: 'Media List',
      type: 'array',
      of: [{
        name: 'media',
        type: 'object',
        title: 'Media Item',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
              sources: [
                {type: 'file', title: 'Upload'},
                {type: 'asset', title: 'Previously uploaded'}
              ]
            },
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          }
        ],
        preview: {
          select: {
            title: 'title',
            media: 'image'
          }
        }
      }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      mediaList: 'mediaList',
    },
    prepare: ({ mediaList }) => {
      return {
        title: 'Media Slider',
        subtitle: mediaList?.length ? `${mediaList.length} items` : 'No items',
        mediaList,
      }
    },
    component: PreviewMediaSlider,
  },
})
