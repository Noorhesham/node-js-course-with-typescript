import { definePageComponent } from '../definePageComponent'
import { TextIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import BodyInputForToc from '@/components/BodyInputForToc'

export const basicText = definePageComponent({
  name: 'basicText',
  title: 'Basic Text',
  description: 'A simple text block',
  icon: TextIcon,
  fields: [
    {
      name: 'body',
      title: 'Body (Column 1)',
      type: 'complexRichText',
      group: 'content',
      components: {
        input: BodyInputForToc
      },
    },
    {
      name: 'bodyAlt',
      title: 'Body (Column 2)',
      type: 'complexRichText',
      group: 'content',
      hidden: ({ parent }) => parent.layout !== 'twoColumns',
    },
    defineField({
      name: 'enableTableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      hidden: ({ parent }) => parent.layout !== 'singleColumn',
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      group: 'content',
      hidden: true,
      of: [{
        type: 'object',
        name: 'tocItem',
        title: 'Table of Contents Item',
        preview: {
          select: {
            title: 'title',
            level: 'level'
          },
          prepare({ title, level }) {
            return {
              title: `H${level}: ${title}`
            }
          }
        },
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title'
          },
          {
            name: 'originalTitle',
            type: 'string',
            title: 'Original Title'
          },
          {
            name: 'level',
            type: 'number',
            title: 'Heading Level'
          },
          {
            name: 'sectionId',
            type: 'string',
            title: 'Section ID'
          },
          {
            name: 'hidden',
            type: 'boolean',
            title: 'Hidden',
            initialValue: false
          },
          {
            name: 'order',
            type: 'number',
            title: 'Order'
          }
        ]
      }]
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Single Column', value: 'singleColumn' },
          { title: 'Two Columns', value: 'twoColumns' },
        ],
      },
      initialValue: 'singleColumn',
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      body: 'body',
      bodyRight: 'bodyRight',
    },
    prepare: ({ body }) => {
      const bodyString = body ? blockPreview(body) : 'No body'
      return {
        title: 'Basic Text',
        subtitle: bodyString,
      }
    },
  },
  components: {
    // preview: PreviewBasicText,
  },
})
