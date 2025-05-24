import { seo } from '@/schemas/fields/seo'
import { BillIcon, EditIcon, HashIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import BodyInputForToc from '@/components/BodyInputForToc'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: BillIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
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
          }
        ]
      }]
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'legalRichText',
      group: 'content',
      components: {
        input: BodyInputForToc
      },
    }),
    {
      ...seo,
      options: {
        slugPrefix: 'legal',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        'Use this name for internal reference only. It will not be displayed on the site.',
      type: 'string',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      slug: 'seo.slug.current',
    },
    prepare({ title, internalName, slug }) {
      const slugString = slug

      return {
        title: title || internalName || 'Untitled Legal Page',
        subtitle: slugString,
      }
    },
  },
})
