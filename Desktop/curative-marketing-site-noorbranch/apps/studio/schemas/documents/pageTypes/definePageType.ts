import { singletonPageComponent } from '@/schemas/componentSchemas'
import { pageBody } from '@/schemas/fields/pageBody'

import { breadcrumbItem } from '@/schemas/componentSchemas/hero/breadcrumbItem'
import { userIsAdministrator } from '@/utils'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const genericPage = defineType({
  name: 'page',
  title: 'Page',
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
  // Cache user role check
  initialValue: {
    __isAdmin: userIsAdministrator(window?.__sanityUser),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'mandatoryBodyComponents',
      title: 'Mandatory Body Components',
      description:
        'These components are required on the page and can only be edited by an admin.',
      group: 'content',
      type: 'array',
      of: [singletonPageComponent],
      readOnly: (props) => !props.parent?.__isAdmin,
      hidden: () => {
        return true
      },
    }),
    pageBody,
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
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      slug: 'seo.slug.current',
      mandatoryBodyComponents: 'mandatoryBodyComponents',
      body: 'body',
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
