import { UsersIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewTeamBlock } from './PreviewTeamBlock'

export const teamBlock = definePageComponent({
  name: 'teamBlock',
  title: 'Team Block',
  description: 'Team Block',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'teammates',
      title: 'Teammates',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      teammates: 'teammates',
    },
    prepare({ teammates }) {
      return {
        title: 'Team block',
        teammates,
      }
    },
  },
  components: {
    preview: PreviewTeamBlock,
  },
})
