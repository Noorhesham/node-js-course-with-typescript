import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { PreviewHeroMarquee } from './PreviewHeroMarquee'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'
import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'
import {
  BlockContentIcon,
  ControlsIcon,
  ExpandIcon,
  PanelRightIcon,
  TagIcon
} from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import { ctaCard } from './ctaCard/ctaCard'
import { PreviewCompany } from './trustBar/PreviewCompany'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { richImage } from '@/schemas/fields/richImage'
import { ImageIcon } from '@sanity/icons'

export const heroMarquee = defineField({
  name: 'heroMarquee',
  title: 'Hero (Marquee Video)',
  icon: BlockContentIcon,
  description: 'A hero with background video',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: PanelRightIcon,
      default: true,
    },
    {
      name: 'badge',
      title: 'Badge Announcement',
      icon: TagIcon,
    },
    {
      name: 'layout',
      title: 'Layout',
      icon: ExpandIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: ControlsIcon,
    },
  ],
  fieldsets: [
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'badgeAnnouncement',
      title: 'Badge Announcement',
      options: {
        collapsible: true,
        collapsed: true,
      },
      group: 'badge',
    },
  ],
  fields: [
    {
      ...eyebrow,
      title: 'Standard Eyebrow',
      fieldset: 'eyebrow',
      group: 'content',
    },
    {
      ...heading,
      group: 'content',
      initialValue: {
        headingLevel: 'h1',
        headingSize: '2xl',
      },
    },
    {
      ...complexComponentBody,
      name: 'body',
      title: 'Body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      group: 'content',
      of: [...complexComponentBody.of, ctaCard],
      options: {
        allowedCtaTypes: [
          'link',
          'internalLink',
          'emailCapture',
          'playVideo',
          'glassLinkCard',
        ],
      },
    },
    defineField({
      name: 'badgeAnnouncement',
      title: 'Badge Announcement Bar',
      type: 'object',
      group: 'badge',
      fieldset: 'badgeAnnouncement',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Badge Announcement',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'text',
          title: 'Badge Text',
          type: 'string',
          validation: Rule => Rule.custom((value, context) => {
            // @ts-ignore
            if (context.parent?.enabled && !value) {
              return 'Badge text is required when badge is enabled';
            }
            return true;
          }),
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: 'link',
          title: 'Badge Link',
          type: 'object',
          hidden: ({ parent }) => !parent?.enabled,
          fields: [
            defineField({
              name: 'actionType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'External Link', value: 'link' },
                  { title: 'Internal Link', value: 'internalLink' },
                ],
              },
              initialValue: 'link',
            }),
            defineField({
              name: 'link',
              title: 'External Link',
              type: 'object',
              hidden: ({ parent }) => parent?.actionType !== 'link',
              fields: [
                defineField({
                  name: 'href',
                  title: 'URL',
                  type: 'url',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
                }),
              ],
            }),
            defineField({
              name: 'internalLink',
              title: 'Internal Link',
              type: 'object',
              hidden: ({ parent }) => parent?.actionType !== 'internalLink',
              fields: [
                defineField({
                  name: 'reference',
                  title: 'Reference',
                  type: 'reference',
                  to: [
                    { type: 'page' },
                    { type: 'clientStory' },
                  ],
                }),
              ],
            }),
          ],
        }),

      ],
    }),
    defineField({
      name: 'trustbar',
      title: 'Trustbar',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [],
              of: [tokenReference],
            }),
          ],
        }),
        defineField({
          name: 'trustbars',
          title: 'Trustbars',
          type: 'array',
          of: [
            defineField({
              name: 'trustbar',
              title: 'Trustbar',
              type: 'object',
              fields: [
                defineField({
                  name: 'token',
                  title: 'Token',
                  type: 'reference',
                  to: [{ type: 'token' }],
                }),
                
                defineField({
                  name: 'companies',
                  title: 'Companies',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'company',
                      title: 'Company',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'companyType',
                          title: 'Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Reference', value: 'reference' },
                              { title: 'Just a Logo', value: 'image' },
                            ],
                          },
                        }),
                        defineField({
                          name: 'company',
                          title: 'Company',
                          type: 'reference',
                          to: [{ type: 'company' }],
                          hidden: ({ parent }) => parent?.companyType !== 'reference',
                        }),
                        {
                          ...richImage,
                          name: 'logo',
                          title: 'Just a Logo',
                          icon: ImageIcon,
                          hidden: ({ parent }) => parent?.companyType !== 'image',
                        },
                        defineField({
                          name: 'backgroundColor',
                          title: 'Background Color',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Pink Gradient', value: 'pink-gradient' },
                              { title: 'Pink - Heygen', value: 'pink-heygen' },
                              { title: 'Blue Gradient', value: 'blue-gradient' },
                              { title: 'Blue Grid Gradient', value: 'blue-grid-gradient' },
                              { title: 'Blue Green Gradient', value: 'blue-green-gradient' },
                              { title: 'Osano Blue Gradient', value: 'osano-blue-gradient' },
                              { title: 'Sky Blue with Circle', value: 'sky-blue-circle' },
                              { title: 'Dark Universe', value: 'dark-universe' },
                              { title: 'White', value: 'white' },
                              { title: 'White - Calendly', value: 'white-calendly' },
                              { title: 'White - Redis', value: 'white-redis' },
                              { title: 'White - TruePic', value: 'white-truepic' },
                              { title: 'White - Credly', value: 'white-credly' },
                              { title: 'White Purple Pattern', value: 'white-purple-pattern' },
                              { title: 'Green - Routable', value: 'green-routable' },
                              { title: 'Purple Gradient', value: 'purple-gradient' },
                              { title: 'Purple', value: 'purple' },
                              { title: 'Purple - Solana', value: 'purple-solana' },
                              { title: 'Gray', value: 'gray' },
                              { title: 'Black', value: 'black' },
                            ],
                          },
                        }),
                        {
                          ...richImage,
                          name: 'backgroundImage',
                          title: 'Background Image',
                        },
                        {
                          ...richImage,
                          name: 'screenshot',
                          title: 'Website screenshot',
                        },
                        defineField({
                          name: 'isMobileScreenshot',
                          title: 'Is mobile screenshot?',
                          type: 'boolean',
                          initialValue: false
                        }),
                        defineField({
                          name: 'isDark',
                          title: 'Is Dark?',
                          type: 'boolean',
                          initialValue: false
                        }),
                      ],
                      preview: {
                        select: {
                          company: 'company',
                          logo: 'logo',
                        },
                        prepare({ company, logo }) {
                          const title = 'Company'
                    
                          return {
                            title,
                            company,
                            logo,
                          }
                        },
                      },
                      components: {
                        preview: PreviewCompany,
                      },
                    }),
                  ],
                }),
              ],
            }),
          ]
        })
      ],
    }),
    defineField({
      name: 'clientStories',
      title: 'Client Stories',
      group: 'content',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'clientStory' }],
      }],
    }),

    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'video',
      group: 'layout',
    }),
    ...sharedComponentLayoutFields.map(field => ({
      ...field,
      group: 'layout',
    })),
    ...sharedComponentSettingsFields,
  ],
  preview: {
    select: {
      heading: 'heading.text',
      body: 'body'
    }
  },
  components: {
    input: GenericInputWithJsonView,
    preview: PreviewHeroMarquee
  },
})
