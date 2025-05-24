import { BsStackOverflow } from 'react-icons/bs'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewCardDeck } from './PreviewCardDeck'
import { card } from './card'

export const cardDeck = definePageComponent({
  name: 'cardDeck',
  title: 'Card Deck',
  description: 'A panel of cards arrayed in columns',
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
    prepare: ({ cards }) => {
      return {
        title: 'Card Deck',
        cards,
      }
    },
  },
  components: {
    preview: PreviewCardDeck,
  },
})
