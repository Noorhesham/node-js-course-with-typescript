import { DocumentVideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const video = defineType({
  name: 'video',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'videoDetails',
      title: 'Video Details',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'videoProvider',
          title: 'Video Provider',
          type: 'string',
          options: {
            list: [
              {title: 'YouTube', value: 'youtube'},
              {title: 'File', value: 'file'},
            ],
          },
          validation: (Rule) => Rule.required(),
          initialValue: 'youtube',
        }),
        defineField({
          name: 'videoId',
          title: 'Video ID',
          type: 'string',
          validation: (Rule) => 
            Rule.custom((_value, document) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const doc = document as any;
              if (doc.videoProvider === 'youtube' && !_value) {
                return 'This field is required.'
              }

              return true
            }),
          hidden: ({parent}) => parent?.videoProvider !== 'youtube',
        }),
        defineField({
          title: 'Video File',
          type: 'file',
          name: 'video',
          options: { accept: '.mp4' },
          hidden: ({parent}) => parent?.videoProvider !== 'file',
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'videoDetails.title',
      media: 'videoDetails.thumbnail',
      subtitle: 'videoDetails.videoProvider',
    },
  },
})
