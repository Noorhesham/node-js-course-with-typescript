import { BsCardList } from 'react-icons/bs'

import { definePageComponent } from '../definePageComponent'

import { PreviewCardCarousel } from '@/schemas/componentSchemas/cardCarousel/PreviewCardCarousel'
import { card } from '@/schemas/componentSchemas/cardCarousel/card'

export const cardCarousel = definePageComponent({
  name: 'cardCarousel',
  title: 'Card Carousel',
  description: 'Card Carousel',
  icon: BsCardList,
  fields: [
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [card],
    },
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare: ({ cards }) => ({
        title: 'Card Carousel',
        cards,
      }),
  },
  components: {
    preview: PreviewCardCarousel,
  },
})
