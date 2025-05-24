// –------------------------------------------------
// BETWEEN THE BRACKETS POST (document)
//
// Contains content for between-the-brackets posts on the site.
//
// –------------------------------------------------

import { blogCategories } from '@/schemas/fields/blogCategories'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { complexRichText } from '@/schemas/fields/richText/complexRichText'
import { CodeBlockIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import BodyInputForToc from '@/components/BodyInputForToc'

export const betweenTheBracketPost = defineType({
  name: 'betweenTheBracketPost',
  title: 'Between The Brackets Post',
  type: 'document',
  icon: CodeBlockIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: CodeBlockIcon,
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
        Rule.required().error('You must provide a title for this post.'),
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
      title: 'Content',
      type: 'complexRichText',
      group: 'content',
      description: 'The content that will be rendered on the page',
      components: {
        input: BodyInputForToc
      }
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'A brief excerpt or summary of this post. This is optional but makes your post more easily shareable on social media and in listings.',
      type: 'text',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'interviewer',
      title: 'Interviewer',
      description: 'The person conducting the interview.',
      type: 'reference',
      group: 'content',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'interviewee',
      title: 'Interviewee',
      description: 'The person being interviewed.',
      type: 'reference',
      group: 'content',
      to: [{ type: 'person' }],
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
        slugPrefix: 'between-the-brackets',
      },
    }),

    // SETTINGS
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this post from appearing in content listings.',
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
