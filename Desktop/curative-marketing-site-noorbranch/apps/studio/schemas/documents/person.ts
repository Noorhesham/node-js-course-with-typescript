// –------------------------------------------------
// PERSON (document)
//
// Contains details about people referenced anywhere on the site.
// For example, this document may be referenced as an author for a blog post or testimonial.
//
// –------------------------------------------------

import { EditIcon, LinkIcon, UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  options: {
    sanityCreate: {
      exclude: true
    },
  },
  // Fieldsets enable you to visually group fields within a document.
  // You define them here, then assign specific fields to each fieldset when defining it.
  fieldsets: [
    {
      name: 'name',
      title: 'Name',
      options: { columns: 2 },
    },
    {
      name: 'employment',
      title: 'Employment',
    },
    {
      name: 'socialMediaUrls',
      title: 'Social Media Links',
    },
  ],
  // Field groups act as tabs in the document field editor.
  groups: [
    { name: 'basics', title: 'Basics', icon: EditIcon, default: true },
    { name: 'social', title: 'Social Links', icon: LinkIcon },
  ],
  fields: [
    // Basic information
    defineField({
      name: 'firstName',
      title: 'First',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: (Rule) =>
        Rule.required().warning(
          'You must provide a first name for this person.',
        ),
    }),
    defineField({
      name: 'lastName',
      title: 'Last',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: (Rule) =>
        Rule.required().warning(
          'You must provide a last name for this person.',
        ),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'simpleRichText',
      group: 'basics',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      group: 'basics',
      // See Sanity's docs on image fields here: https://www.sanity.io/docs/image-type
      options: {
        hotspot: true,
      },
    }),

    // Social media URLs
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'xUrl',
      title: 'X',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Github',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
  ],

  // The preview object controls how person documents will appear in lists.
  // `select` gathers information from the document's fields and prepares
  // an object that will be passed to the prepare function. Note how the keys
  // in `select` are destructured in the preapre function.

  // This configuration joins the first and last names as the displayed title
  // and collates the role and company name (which is grabbed from the
  // referenced company doc!) as a subtitle.
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      company: 'company.name',
      media: 'headshot',
    },
    prepare({ firstName, lastName, role, company, media }) {
      const title = [firstName, lastName].filter((i) => i).join(' ')

      let subtitle: string[] | string = [role, company]

      if (role && company) {
        subtitle = subtitle.join(' | ')
      } else {
        subtitle = subtitle.filter((i) => i).join('')
      }

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
