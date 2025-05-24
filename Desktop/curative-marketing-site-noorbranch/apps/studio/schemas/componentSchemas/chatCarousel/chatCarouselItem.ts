import { defineField } from 'sanity'

export const chatCarouselItem = defineField({
  name: 'chatCarouselItem',
  title: 'Chat Carousel Item',
  type: 'object',
  fields: [
    defineField({
      name: 'clientQuestion',
      title: 'Client Question',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'webstacksAnswers',
      title: 'Webstacks Answers',
      type: 'array',
      of: [
        defineField({
          name: 'answer',
          title: 'Answer',
          type: 'object',
          fields: [
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'simpleRichText',
            }),
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: {
                list: [
                  {title: 'Red', value: 'red'},
                  {title: 'Green', value: 'green'},
                ],
              },
              initialValue: 'red',
            })
          ],
          preview: {
            select: {
              title: 'answer',
            }
          }
        })
      ],
    }),
  ],
  preview: {
    select: {
      title: 'clientQuestion',
    },
  },
})
