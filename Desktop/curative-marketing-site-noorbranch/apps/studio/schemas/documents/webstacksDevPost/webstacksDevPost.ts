// –------------------------------------------------
// WEBSTACKS DEV POST (document)
//
// Contains content for dev blog posts on the site.
//
// –------------------------------------------------

import { blogCategories } from '@/schemas/fields/blogCategories'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import BodyInputForToc from '@/components/BodyInputForToc'
import { PreviewWebstacksDevPost } from './PreviewWebstacksDevPost'

export const webstacksDevPost = defineType({
  name: 'webstacksDevPost',
  title: 'Dev Blog Post',
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
        Rule.required().error('You must provide a title for this dev blog post.'),
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
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'This image will be used for the featured image on the blog post.',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          ...richImage,
          name: 'image',
          title: 'Image',
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    // Categories
    defineField({
      ...blogCategories,
      group: 'categories',
    }),

    // SEO
    defineField({
      ...seo,
      group: 'seo',
    }),

    // Settings
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        'This is for internal use only and will not be displayed on the site.',
      type: 'string',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      'seo.slug.current': 'seo.slug.current',
      media: 'featuredImage.image',
      publishDate: 'publishDate',
      excerpt: 'excerpt',
      featuredImage: 'featuredImage',
    },
    prepare(selection) {
      const { title, internalName, 'seo.slug.current': slug, media } = selection;
      return {
        title: internalName || title || 'Untitled',
        subtitle: slug ? `/blog/${slug}` : '(missing slug)',
        media,
      }
    },
  },
})
