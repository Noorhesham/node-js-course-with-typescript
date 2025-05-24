import { StarIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { clientStoryItem } from '@/schemas/componentSchemas/clientStoriesBento/clientStoryItem'
import { PreviewClientStoriesBento } from './PreviewClientStoriesBento'
import { heading } from '@/schemas/fields/heading'
import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'

export const clientStoriesBento = defineField({
  name: 'clientStoriesBento',
  title: 'Client Stories Bento',
  description: 'A bento box for client stories',
  icon: StarIcon,
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'layout',
      title: 'Layout',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    {
      ...heading,
      group: 'content',
    },
    defineField({
      name: 'clientStories',
      title: 'Client Stories',
      type: 'array',
      of: [clientStoryItem],
      group: 'content',
    }),
    ...sharedComponentLayoutFields.map(field => ({
      ...field,
      group: 'layout',
    })),
    ...sharedComponentSettingsFields.map(field => ({
      ...field,
      group: 'settings',
    })),
  ],
  components: {
    preview: PreviewClientStoriesBento
  },
  preview: {
    select: {
      clientStories: 'clientStories'
    },
    prepare: ({ clientStories }) => {
      return {
        title: 'Client Stories Bento',
        clientStories
      }
    }
  }
})
