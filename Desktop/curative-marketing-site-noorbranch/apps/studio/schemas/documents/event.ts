// –------------------------------------------------
// EVENT (document)
//
// Contains details about an event. This is distinct
// from a webinar.
//
// –------------------------------------------------

import { embeddedFormForResources } from '@/schemas/fields/embeddedForm/embeddedFormForResources'
import { pageBody } from '@/schemas/fields/pageBody'
import { seo } from '@/schemas/fields/seo'
import { timezone } from '@/schemas/fields/timezone'
import {
  CalendarIcon,
  EditIcon,
  HashIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { TbForms } from 'react-icons/tb'
import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
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
  fieldsets: [
    {
      name: 'datetime',
      title: 'Date and Time',
      options: { collapsible: true, collapsed: false, columns: 2 },
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
      fieldset: 'datetime',
    }),
    {
      ...timezone,
      group: 'content',
      fieldset: 'datetime',
    },
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichTextWithImages',
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'presenters',
      title: 'Presenters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blogRichText',
      group: 'content',
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
    {
      ...seo,
      options: {
        slugPrefix: 'resources/webinars-and-events',
        includeSlugPrefixInStoredValue: false,
      },
    },
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
      type: 'string',
      group: 'settings',
    }),
  ],
})
