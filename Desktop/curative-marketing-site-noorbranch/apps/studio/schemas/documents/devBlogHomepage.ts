import { defineField, defineType, defineArrayMember } from 'sanity'
import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons'
import { MdHome } from 'react-icons/md'
import { seo } from '@/schemas/fields/seo'

export const devBlogHomepage = defineType({
  name: 'devBlogHomepage',
  title: 'Dev Blog Homepage',
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
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'webstacksDevPost' }],
        }),
      ],
      validation: (Rule) => Rule.max(3),
      group: 'content',
    }),
    defineField({
      name: 'conversionPanels',
      title: 'Conversion Panels',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'cta' }],
        }),
      ],
      validation: (Rule) => Rule.max(2),
      group: 'content',
    }),
    defineField({
      ...seo,
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Dev Blog Homepage',
        media: EditIcon,
      }
    },
  },
})
