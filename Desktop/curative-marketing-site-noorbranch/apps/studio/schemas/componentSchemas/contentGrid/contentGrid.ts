import { BsStackOverflow } from 'react-icons/bs'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewContentGrid } from './PreviewContentGrid'
import { card } from './card'

export const contentGrid = definePageComponent({
  name: 'contentGrid',
  title: 'Content Grid',
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
    prepare: ({ cards }) => ({
      title: 'Content Grid',
      subtitle: cards?.length ? `${cards.length} cards` : 'No cards added yet',
      media: BsStackOverflow,
      cards,
    }),
  },
  components: {
    preview: PreviewContentGrid,
  },
})
