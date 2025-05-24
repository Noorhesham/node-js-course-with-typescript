import { defineField, defineType, defineArrayMember } from 'sanity'
import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons'
import { MdHome } from 'react-icons/md'
import { seo } from '../fields/seo'

export const blogHomepage = defineType({
  name: 'blogHomepage',
  title: 'Blog Homepage',
  type: 'document',
  icon: MdHome,
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
      name: 'featuredArticles',
      title: 'Featured Articles',
      description: 'Select blog posts to feature at the top of the page',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogPost' }],
        }),
      ],
      validation: (Rule) => Rule.max(6),
      group: 'content',
    }),
    defineField({
      name: 'conversionPanels',
      title: 'Conversion Panels',
      description: 'Select up to two shared modules to display as conversion panels',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'sharedModule' }],
        }),
      ],
      validation: (Rule) => Rule.max(2),
      group: 'content',
    }),
    seo,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Blog Homepage',
      }
    },
  },
})
