import { embeddedFormForResources } from '@/schemas/fields/embeddedForm/embeddedFormForResources'
import { pageBody } from '@/schemas/fields/pageBody'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import {
  EditIcon,
  HashIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { TbForms } from 'react-icons/tb'
import { defineField } from 'sanity'

export const downloadBase = {
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'form',
      title: 'Form',
      icon: TbForms,
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
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    {
      ...embeddedFormForResources,
      group: 'form',
    },
    {
      ...pageBody,
      name: 'thankYouPageBody',
      title: 'Thank You Page Body',
      group: 'form',
      hidden: ({ parent }) => {
        return !parent?.embeddedForm?.submitBehavior?.includes('thankYouPage')
      },
    },
    defineField({
      name: 'content',
      title: 'Content',
      type: 'complexRichText',
      group: 'content',
      description: 'The main content that appears at the top of the page, next to the form. Use this to provide a compelling overview of what the downloadable asset contains.',
      components: {
        input: GenericInputWithJsonView,
      },
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    pageBody,
    {
      ...seo,
      options: {
        slugPrefix: 'downloads',
      },
      group: 'seo',
    },
  ],
}
