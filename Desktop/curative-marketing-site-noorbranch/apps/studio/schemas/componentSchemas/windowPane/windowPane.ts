import { BsStackOverflow } from 'react-icons/bs'
import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { definePageComponent } from '../definePageComponent'
import { PreviewWindowPane } from './PreviewWindowPane'
import { pane } from './pane'

export const windowPane = definePageComponent({
  name: 'windowPane',
  title: 'Window Pane',
  description: 'A panel of cards arrayed in columns',
  icon: BsStackOverflow,
  fields: [
    {
      ...eyebrow,
      title: 'Standard Eyebrow',
    },
    {
      ...heading,
      initialValue: {
        headingLevel: 'h1',
        headingSize: 'display-xl',
      },
    },
    {
      ...complexComponentBody,
      name: 'body',
      title: 'Body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
    },
    {
      name: 'panes',
      title: 'Panes',
      type: 'array',
      of: [pane],
    },
  ],
  preview: {
    select: {
      cards: 'panes',
    },
    prepare: ({ panes }) => {
      return {
        title: 'Window Pane',
        panes,
      }
    },
  },
  components: {
    preview: PreviewWindowPane,
  },
})
