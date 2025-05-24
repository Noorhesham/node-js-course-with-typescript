import { BsStackOverflow } from 'react-icons/bs'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewBeforeAfterCompare } from './PreviewBeforeAfterCompare'

export const beforeAfterCompare = definePageComponent({
  name: 'beforeAfterCompare',
  title: 'Before/After Compare',
  description: 'Before/After Compare',
  icon: BsStackOverflow,
  fields: [
    defineField({
      name: 'companies',
      title: 'Company List',
      type: 'array',
      of: [
        defineField({
          name: 'company',
          title: 'Company',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Domain',
              type: 'string',
            }),
            defineField({
              name: 'before',
              title: 'Before',
              type: 'image',
            }),
            defineField({
              name: 'after',
              title: 'After',
              type: 'image',
            }),
            defineField({
              name: 'testimonial',
              title: 'Testimonial',
              type: 'reference',
              to: [{ type: 'testimonial' }],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      companies: 'companies',
    },
    prepare: ({ companies = [] }) => {
      return {
        title: companies.length > 0
          ? `Before/After Compare | ${companies.map((item: any) => item.title).join(', ')}`
          : 'Before/After Compare',
        companies
      }
    },
  },
  components: {
    preview: PreviewBeforeAfterCompare
  },
})
