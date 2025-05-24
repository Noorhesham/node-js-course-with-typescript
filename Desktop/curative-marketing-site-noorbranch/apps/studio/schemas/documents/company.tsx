// –------------------------------------------------
// COMPANY (document)
//
// Contains details about companies referenced anywhere on the site.
// For example, this document may be referenced as an employer for
// a person or a customer to include in a logo carousel.
//
// –------------------------------------------------

import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'
import { imageBuilder } from '@/utils/client'
import { logo } from '@/schemas/fields/logo'

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: CaseIcon,
  options: {
    sanityCreate: {
      exclude: true
    },
  },
  groups: [
    {
      name: 'details',
      title: 'Company Details',
      default: true,
    },
    {
      name: 'other',
      title: 'Other',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('You must provide a name for this company.'),
      group: 'details',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'size',
      title: 'Company Size',
      description: 'The number of employees at this company.',
      type: 'string',
      options: {
        list: [
          { title: 'Small Business (1-25 Employees)', value: 'small' },
          { title: 'Mid Market (25-200 Employees)', value: 'medium' },
          { title: 'Enterprise (200+ Employees)', value: 'large' },
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
    }),
    {
      ...logo,
      name: 'logotype',
      title: 'Logotype',
      group: 'details',
    },
    {
      ...logo,
      name: 'icon',
      title: 'Icon',
      group: 'details',
    },
  ],
  preview: {
    select: {
      title: 'name',
      logo: 'icon.default',
    },
    prepare({ title, logo, icon }) {
      const media = logo?.asset?._ref ? (
        <span style={{ display: 'flex' }}>
          <img
            style={{ width: 24, height: 24, position: 'relative' }}
            src={imageBuilder.image(logo.asset._ref).url()}
            alt={title}
          />
        </span>
      ) : (
        icon
      )

      return {
        title,
        media,
      }
    },
  },
})
