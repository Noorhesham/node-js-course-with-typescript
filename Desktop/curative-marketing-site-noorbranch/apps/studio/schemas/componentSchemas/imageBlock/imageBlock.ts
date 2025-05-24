import { richImage } from '@/schemas/fields/richImage'
import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'

export const imageBlock = definePageComponent({
  name: 'imageBlock',
  title: 'Image Block',
  description: 'Image Block',
  icon: ImageIcon,
  type: 'object',
  fields: [
    { ...richImage },
    {
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
    },
    {
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
    },
  ],
})
