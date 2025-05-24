import { GoVersions } from 'react-icons/go'
import { defineField } from 'sanity'
import { PreviewFeaturedContent } from './PreviewFeaturedContent'

const REFERENCEABLE_TYPES = [
  'clientStory',
  'guide',
  'report',
  'blogPost',
  'ebook',
  'event',
]

export const featuredContent = defineField({
  name: 'featuredContentCard',
  title: 'Featured Content',
  icon: GoVersions,
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'reference',
      to: REFERENCEABLE_TYPES.map((type) => ({ type })),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      initialValue: 'Read more',
    }),
  ],
  preview: {
    select: {
      contentTitle: 'content.title',
      heading: 'heading',
      description: 'description',
      linkText: 'linkText',
    },
  },
  components: {
    // @ts-ignore
    preview: PreviewFeaturedContent,
  },
})
