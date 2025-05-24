import { PlayIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'

export const videoEmbed = definePageComponent({
  name: 'videoEmbed',
  title: 'Video',
  description: 'An embedded video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoReference',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
    defineField({
      name: 'popupVideoReference',
      title: 'Popup Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: '2xl', value: '2xl' },
          { title: 'xl', value: 'xl' },
          { title: 'lg', value: 'lg' },
          { title: 'md', value: 'md' },
          { title: 'sm', value: 'sm' },
        ],
      },
      initialValue: '2xl',
    }),
    defineField({
      name: 'isFullscreen',
      title: 'Is Fullscreen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'center', value: 'center' },
          { title: 'start', value: 'start' },
          { title: 'end', value: 'end' },
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      videoReference: 'videoReference',
      videoTitle: 'videoReference.videoDetails.title',
      thumbnail: 'videoReference.videoDetails.thumbnail',
    },
    prepare({ videoReference, videoTitle, thumbnail }) {
      const subtitle = videoReference
        ? videoTitle || 'Untitled video'
        : 'No video selected'

      return {
        title: 'Video Block',
        subtitle,
        media: thumbnail,
      }
    },
  },
})
