import { PiShareNetworkDuotone } from 'react-icons/pi'
import { defineField, defineType } from 'sanity'
import type { Rule } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  icon: PiShareNetworkDuotone,
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Twitter', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Dribbble', value: 'dribbble' },
          { title: 'GitHub', value: 'github' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule: Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social Link',
        subtitle: subtitle || '',
      }
    },
  },
})
