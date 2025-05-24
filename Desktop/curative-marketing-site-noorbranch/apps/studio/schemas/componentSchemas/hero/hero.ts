import {
  BlockContentIcon,
  ControlsIcon,
  ExpandIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from '@sanity/icons'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { ctaCard } from '@/schemas/componentSchemas/hero/ctaCard/ctaCard'
import { complexComponentBody } from '@/schemas/fields'
import { genericEmbeddedForm } from '@/schemas/fields/embeddedForm/genericEmbeddedForm'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'


export const hero = defineField({
  name: 'hero',
  title: 'Hero',
  icon: BlockContentIcon,
  description: 'A hero component',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: PanelLeftIcon,
      default: true,
    },
    {
      name: 'featuredContent',
      title: 'Featured Content',
      icon: PanelRightIcon,
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
        headingWeight: 'medium',
        headingSize: '7xl',
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
      name: 'featuredContentType',
      title: 'Featured Content Type',
      type: 'string',
      group: 'featuredContent',
      initialValue: 'media',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Form', value: 'form'},
          {title: 'Animation', value: 'animation'}
        ],
      }
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'featuredContent',
      hidden: ({parent}) => parent?.featuredContentType !== 'image',
    }),
    defineField({
      name: 'isFullfeaturedImageSize',
      title: 'Is Full Featured Image Size',
      type: 'boolean',
      initialValue: false,
      group: 'featuredContent',
      hidden: ({parent}) => parent?.featuredContentType !== 'image',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'video',
      group: 'featuredContent',
      hidden: ({parent}) => parent?.featuredContentType !== 'video',
    }),
    defineField({
      ...genericEmbeddedForm,
      fields: [
        ...genericEmbeddedForm.fields.slice(3)
      ],
      name: 'embeddedForm',
      title: 'Form',
      group: 'featuredContent',
      hidden: ({parent}) => parent?.featuredContentType !== 'form',
    }),
    defineField({
      name: 'featuredAnimation',
      title: 'Featured Animation',
      type: 'file',
      group: 'featuredContent',
      hidden: ({parent}) => parent?.featuredContentType !== 'animation',
      description: 'Upload an animation file (e.g., GIF, Lottie JSON, etc.)',
    }),
    // LAYOUT
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Stacked', value: 'stacked' },
          { title: 'Split', value: 'split' },
          { title: 'Client Story Listing', value: 'client-story-listing' },
          { title: 'Reviews Listing', value: 'reviews-listing' },
        ],
      },
      initialValue: 'stacked',
    }),


    defineField({
      name: 'featuredClientStory',
      title: 'Featured Client Story',
      type: 'reference',
      to: [{ type: 'clientStory' }],
      hidden: ({ parent }) => parent?.layout !== 'client-story-listing',
      group: 'layout',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'layout',
    }),

    ...sharedComponentLayoutFields,
    ...sharedComponentSettingsFields,
  ],
  preview: {
    select: {
      heading: 'heading.text',
    },
    // eslint-disable-next-line no-shadow
    prepare: ({ heading }) => {
      const headingString = heading ? blockPreview(heading) : 'No heading'

      return {
        title: 'Hero',
        subtitle: headingString,
      }
    },
  },
  components: {
    input: GenericInputWithJsonView,
  },
})
