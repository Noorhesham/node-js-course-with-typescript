import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'

export const parallelPanels = definePageComponent({
  name: 'parallelPanels',
  title: 'Parallel Panels',
  description: 'Parallel Panels',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      of: [
        defineField({
          name: 'panel',
          title: 'Panel',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'simpleRichText',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
    },
    prepare: ({ internalName }) => {
      return {
        title: internalName,
      }
    },
  },
  components: {
    // preview: PreviewProcon,
  },
})
