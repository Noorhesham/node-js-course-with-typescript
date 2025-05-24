import { StarIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { PreviewClientStoriesCallout } from '@/schemas/componentSchemas/clientStoriesCallout/PreviewClientStoriesCallout'
import { clientStoryItem } from '@/schemas/componentSchemas/clientStoriesCallout/clientStoryItem'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'

export const clientStoriesCallout = defineField({
  name: 'clientStoriesCallout',
  title: 'Client Stories Callout',
  description: 'A callout for client stories',
  icon: StarIcon,
  type: 'object',
  fields: [
    eyebrow,
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-lg',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'clientStories',
      title: 'Client Stories',
      type: 'array',
      of: [clientStoryItem],
    }),
  ],
  preview: {
    prepare: () => ({
        title: 'Client Stories Callout',
      }),
  },
  components: {
    preview: PreviewClientStoriesCallout,
  },
})
