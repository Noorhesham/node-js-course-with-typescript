import { FiMessageSquare } from 'react-icons/fi'
import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'

import { chatCarouselItem } from '@/schemas/componentSchemas/chatCarousel/chatCarouselItem'
import { PreviewChatCarousel } from './PreviewChatCarousel'

export const chatCarousel = definePageComponent({
  name: 'chatCarousel',
  title: 'Chat Carousel',
  description: 'Chat Carousel component',
  icon: FiMessageSquare,
  fields: [
    defineField({
      name: 'sliders',
      title: 'Sliders',
      type: 'array',
      of: [chatCarouselItem],
    }),
  ],
  preview: {
    select: {
      sliders: 'sliders',
    },
    prepare: ({ sliders }) => ({
      title: 'Chat Carousel',
      subtitle: '',
      sliders,
    }),
  },
  components: {
    preview: PreviewChatCarousel
  }
})
