import { richImage } from '@/schemas/fields/richImage'
import { ImageIcon } from '@sanity/icons'
import { FaEllipsisH } from 'react-icons/fa'
import { defineField } from 'sanity'
import { PreviewTrustBar } from './PreviewTrustBar'

export const trustBar = defineField({
  name: 'trustBar',
  title: 'Trust Bar',
  type: 'object',
  icon: FaEllipsisH,
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {
            title: 'Scrolling',
            value: 'scrolling',
          },
          {
            title: 'Fixed',
            value: 'fixed',
          },
        ],
      },
      initialValue: 'scrolling',
    }),
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'company' }],
        },
        {
          ...richImage,
          name: 'logo',
          title: 'Just a Logo',
          icon: ImageIcon,
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      companies: 'companies',
    },
    prepare({ companies }) {
      const title = 'Trust Bar'

      return {
        title,
        companies,
      }
    },
  },
  components: {
    preview: PreviewTrustBar,
  },
})
