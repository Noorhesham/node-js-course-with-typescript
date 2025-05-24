import { defineField } from 'sanity'

import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Animation', value: 'animation' },
        ],
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      hidden: ({ parent }) => parent?.assetType !== 'image',
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'file',
      description: 'Upload an animation file (e.g., GIF, Lottie JSON, etc.)',
      hidden: ({ parent }) => parent?.assetType !== 'animation',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'actionType',
      title: 'CTA Type',
      type: 'string',
      initialValue: 'internalLink',
      options: {
        list: [
          { title: 'External Link', value: 'link' },
          { title: 'Internal Link', value: 'internalLink' },
        ],
      },
    }),
    {
      ...link,
      hidden: ({ parent }) => parent?.actionType !== 'link',
    },

    // Internal Link
    {
      ...internalLink,
      hidden: ({ value, parent }) => {
        const field = value as { reference: unknown }

        return parent?.actionType !== 'internalLink' && !field?.reference
      },
    },
  ],
})
