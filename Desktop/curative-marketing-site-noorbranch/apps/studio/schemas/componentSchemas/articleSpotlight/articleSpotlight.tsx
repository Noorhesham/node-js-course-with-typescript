import { BsPaperclip } from 'react-icons/bs'
import { defineField } from 'sanity'
import { PreviewArticleSpotlight } from './PreviewArticleSpotlight'

import { definePageComponent } from '../definePageComponent'

export const articleSpotlight = definePageComponent({
  name: 'articleSpotlight',
  title: 'Article Spotlight',
  description: 'Article Spotlight',
  icon: BsPaperclip,
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Card Deck', value: 'cardDeck'},
          {title: 'Hero', value: 'hero'},
        ],
      },
      initialValue: 'cardDeck',
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      description: 'Select specific articles to display. If no articles are selected, the component will automatically display the latest articles.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }]
        }
      ],
    }),
  ],
  preview: {
    select: {
      articles: 'articles'
    },
    prepare: ({ articles }) => ({
      title: 'Article Spotlight',
      articles
    })
  },
  components: {
    preview: PreviewArticleSpotlight
  }
})
