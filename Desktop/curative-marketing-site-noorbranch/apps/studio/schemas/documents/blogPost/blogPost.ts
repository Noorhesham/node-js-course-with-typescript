// –------------------------------------------------
// BLOG POST (document)
//
// Contains content for blog posts on the site.
//
// –------------------------------------------------

import { blogCategories } from '@/schemas/fields/blogCategories'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import BodyInputForToc from '@/components/BodyInputForToc'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: EditIcon,
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
      name: 'categories',
      title: 'Categories',
      icon: TagIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    // Content
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This title will be displayed on the site.',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().error('You must provide a title for this blog post.'),
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
      name: 'enableTableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'complexRichText',
      group: 'content',
      components: {
        input: BodyInputForToc
      }
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A brief summary of the content.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      description: 'Publish Date',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
      group: 'content',
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    publicationDates,
    blogCategories,

    // SEO
    defineField({
      ...seo,
      options: {
        ...seo.options,
        slugPrefix: 'blog',
      },
    }),

    // SETTINGS
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this case study from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
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
      'seo.slug.current': 'seo.slug.current',
      media: 'featuredImage',
    },
    prepare({ title, internalName, 'seo.slug.current': slug, media }) {
      return {
        title: internalName || title,
        subtitle: slug,
        media,
      }
    },
  },
})
