import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewProcon } from './PreviewProcon'

export const procon = definePageComponent({
  name: 'procon',
  title: 'Procon',
  description: 'Procon Table',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'pro',
              title: 'Pro',
              type: 'string',
            }),
            defineField({
              name: 'con',
              title: 'Con',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      rows: 'rows'
    },
    prepare: ({ rows }) => ({
      title: 'ProCon Table',
      rows
    }),
  },
  components: {
    preview: PreviewProcon
  },
})
