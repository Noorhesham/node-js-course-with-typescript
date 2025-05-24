import { GoColumns } from 'react-icons/go'
import { ImageIcon } from '@sanity/icons'
import { FaCloud } from 'react-icons/fa'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
// Using the standard switchback preview component for now
import { PreviewSwitchback } from '../switchback/PreviewSwitchback'

import { definePageComponent } from '../definePageComponent'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'

import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'


export const switchbackLogoCloud = definePageComponent({
  name: 'switchbackLogoCloud',
  title: 'Switchback Logo Cloud',
  icon: GoColumns,
  description:
    'A switchback with a logo cloud, alternating between content and logos.',
  groups: [
    {
      name: 'cloud',
      title: 'Logo Cloud',
      icon: FaCloud
    }
  ],

  fields: [
    {
      ...eyebrow,
    },
    {
      ...heading,
      initialValue: {
        headingLevel: 'h3',
        headingSize: 'display-lg',
      },
    },
    {
      ...complexComponentBody,
    },
    defineField({
      name: 'contentPosition',
      title: 'Content Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      group: 'layout',
    }),
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'companyItem',
          title: 'Company',
          preview: {
            select: {
              companyName: 'company.name',
              companyType: 'company.companyType',
              logo: 'company.company.logo',
            },
            prepare({ companyName, companyType, logo }) {
              return {
                title: companyName || 'Company',
                subtitle: companyType,
                media: logo || ImageIcon,
              }
            },
          },
          fields: [
            defineField({
              name: 'company',
              title: 'Company',
              type: 'object',
              fields: [
                defineField({
                  name: 'companyType',
                  title: 'Company Type',
                  type: 'string',
                  initialValue: 'company',
                  options: {
                    list: [
                      { title: 'Company', value: 'company' },
                      { title: 'Just a Logo', value: 'logo' },
                    ],
                  },
                }),
                defineField({
                  name: 'company',
                  title: 'Company',
                  type: 'reference',
                  to: [{ type: 'company' }],
                  hidden: ({ parent }) => parent?.companyType !== 'company',
                }),
                defineField({
                  name: 'logo',
                  title: 'Just a Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  hidden: ({ parent }) => parent?.companyType !== 'logo',
                }),
              ],
            }),
          ],
        }),
      ],
      group: 'cloud',
    }),
  ],
  components: {
    preview: PreviewSwitchback,
    input: GenericInputWithJsonView,
  },
  preview: {
    select: {
      heading: 'heading.text',
      body: 'body',
      image: 'image',
      contentPosition: 'contentPosition',
      companies: 'companies'
    }
  },
})
