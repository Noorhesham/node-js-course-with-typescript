import { StarIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'

import { PreviewClientStoriesWall } from '@/schemas/componentSchemas/clientStoriesWall/PreviewClientStoriesWall'

export const clientStoriesWall = definePageComponent({
  name: 'clientStoriesWall',
  title: 'Client Stories Wall',
  description: 'A wall for client stories',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineField({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'internalName',
              title: 'Internal Name',
              type: 'string',
            }),
            defineField({
              name: 'clientStories',
              title: 'Client Stories',
              type: 'array',
              of: [
                defineField({
                  name: 'clientStory',
                  title: 'Client Story',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'clientStory',
                      title: 'Client Story',
                      type: 'reference',
                      to: [{ type: 'clientStory' }],
                    }),
                    defineField({
                      name: 'size',
                      title: 'Size',
                      type: 'string',
                      initialValue: 'small',
                      options: {
                        list: [
                          { title: 'Large', value: 'large' },
                          { title: 'Small', value: 'small' },
                        ],
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
        title: 'Client Stories Wall',
      }),
  },
  components: {
    preview: PreviewClientStoriesWall,
  },
})
