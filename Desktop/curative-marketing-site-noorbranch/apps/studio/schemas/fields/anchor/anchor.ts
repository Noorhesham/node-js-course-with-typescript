import { LinkIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { PreviewAnchor } from './PreviewAnchor'

export const anchor = defineField({
  name: 'anchor',
  title: 'Anchor',
  icon: LinkIcon,
  type: 'object',
  description:
    'An invisible marker that can be linked to. Use this to set up anchor links.',
  fields: [
    {
      name: 'anchorId',
      title: 'Anchor ID',
      description:
        'The ID that anchor links will point to. For example, if you set this to "faqs", you can link to this anchor with "/#faqs".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      anchorId: 'anchorId',
    },
  },
  components: {
    // @ts-expect-error
    preview: PreviewAnchor,
  },
})
