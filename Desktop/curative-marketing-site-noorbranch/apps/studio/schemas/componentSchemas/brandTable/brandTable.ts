import { BsTable } from 'react-icons/bs'
import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'

import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { PreviewBrandTable } from './PreviewBrandTable'

export const brandTable = definePageComponent({
  name: 'brandTable',
  title: 'Brand Table',
  description: 'Brand Table component',
  icon: BsTable,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'brands',
              title: 'Brands',
              type: 'array',
              of: [
                defineField({
                  name: 'brand',
                  title: 'Brand',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'brandType',
                      title: 'Brand Type',
                      type: 'string',
                      initialValue: 'image',
                      options: {
                        list: [
                          {title: 'Just a image', value: 'image'},
                          {title: 'Company', value: 'company'}
                        ],
                      }
                    }),
                    defineField({
                      name: 'logo',
                      title: 'Logo',
                      type: 'image',
                      hidden: ({ parent }) => parent?.brandType !== 'image',
                    }),
                    defineField({
                      name: 'company',
                      title: 'Company',
                      type: 'reference',
                      to: [{ type: 'company' }],
                      hidden: ({ parent }) => parent?.brandType !== 'company',
                    }),
                    defineField({
                      name: 'actionType',
                      title: 'CTA Type',
                      type: 'string',
                      initialValue: 'internalLink',
                      options: {
                        list: [
                          { title: 'External Link', value: 'link' },
                          { title: 'Internal Link', value: 'internalLink' },
                        ],
                      },
                    }),
                    {
                      ...link,
                      hidden: ({ parent }) => parent?.actionType !== 'link',
                    },
                    {
                      ...internalLink,
                      hidden: ({ value, parent }) => {
                        const field = value as { reference: unknown }
                
                        return parent?.actionType !== 'internalLink' && !field?.reference
                      },
                    },
                  ]
                })
              ]
            })
          ]
        })
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare(selection) {
      const { items } = selection
      return {
        title: 'Brand Table',
        items
      }
    }
  },
  components: {
    preview: PreviewBrandTable
  },
})
