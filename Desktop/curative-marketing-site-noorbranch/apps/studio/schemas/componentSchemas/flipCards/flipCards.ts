import { BsStackOverflow } from 'react-icons/bs'

import { definePageComponent } from '../definePageComponent'

import { PreviewCardDeck } from '@/schemas/componentSchemas/flipCards/PreviewCardDeck'
import { card } from '@/schemas/componentSchemas/flipCards/card'

export const flipCards = definePageComponent({
  name: 'flipCards',
  title: 'Flip Cards',
  description: 'A slider of flip cards',
  icon: BsStackOverflow,
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
      title: 'Flip Cards',
      cards,
    }),
  },
  components: {
    preview: PreviewCardDeck,
  },
})
