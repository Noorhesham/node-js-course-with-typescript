import { breadcrumbItem } from '@/schemas/componentSchemas/hero/breadcrumbItem'
import { ctaField } from '@/schemas/fields/ctaField'
import { defineCalloutUIField } from '@/schemas/utilities'
import { userIsAdministrator } from '@/utils'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const genericListingPage = defineType({
  name: 'listingPage',
  title: 'Listing Page',
  type: 'document',
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
    defineCalloutUIField({
      heading: 'This page is password protected',
      body: 'Visitors to this page will need to enter a password to view its contents. You can view the password set for this page in the Settings tab.',
      hidden: (props) =>
        !props.parent?.isPasswordProtected || !props.parent?.password,
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'featuredBlogs',
      title: 'Featured Blogs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }],
        },
      ],
      validation: (Rule) => [
        Rule.custom((value, _) => {
          const blogs = value as unknown[] | undefined

          if (blogs?.length && blogs?.length > 4) {
            return 'Featured blogs only supports up to 4 blogs'
          }

          return true
        }).warning(),
      ],
      group: 'content',
    }),
    defineField({
      name: 'conversionPanelCards',
      title: 'Conversion Panel Cards',
      type: 'array',
      of: [
        defineField({
          name: 'conversionPanel',
          title: 'Conversion Panel',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'subhead',
              title: 'Subhead',
              type: 'string',
            },
            {
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: {
                list: [
                  {title: 'Downloadable Asset', value: 'downloadableAsset'},
                  {title: 'Client Story', value: 'clientStory'},
                  {title: 'Brand', value: 'brand'},
                  {title: 'Internal', value: 'internal'},
                  {title: 'Newsletter', value: 'newsletter'},
                ],
              },
              initialValue: 'downloadableAsset',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({parent}) => parent?.theme === 'newsletter' || parent?.theme === 'brand',
            },
            {
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              hidden: ({parent}) => parent?.theme !== 'clientStory' && parent?.theme !== 'brand',
            },
            {
              name: 'ctas',
              title: 'CTAs',
              type: 'array',
              of: [{
                ...ctaField,
                name: 'localCta',
              }]
            }
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'showBreadcrumb',
      title: 'Show Breadcrumb',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb',
      type: 'array',
      of: [breadcrumbItem],
      group: 'settings',
      hidden: ({ parent }) => !parent.showBreadcrumb,
    }),
    defineField({
      name: 'isPasswordProtected',
      title: 'Password Protected?',
      description:
        'If checked, the page will require a password to view. (You must be an admin to edit this field.)',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      readOnly: (props) => {
        if (userIsAdministrator(props.currentUser)) {
          return false
        }

        return true
      },
    }),
    defineField({
      name: 'password',
      title: 'Password',
      description:
        'The password required to view the page. (You must be an admin to edit this field.)',
      type: 'string',
      group: 'settings',
      hidden: (props) => !props.parent?.isPasswordProtected,
      validation: (Rule) =>
        Rule.error().custom((value, context) => {
          const parent = context.parent as { isPasswordProtected: boolean }

          if (parent.isPasswordProtected && !value) {
            return 'Password is required'
          }

          return true
        }),
      readOnly: (props) => {
        if (userIsAdministrator(props.currentUser)) {
          return false
        }

        return true
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      slug: 'seo.slug.current',
    },
    prepare: ({ title, internalName, slug }) => {
      const slugPreview = slug ? `${slug}` : 'Not published'

      return {
        title: internalName || title,
        subtitle: slugPreview,
      }
    },
  },
})
