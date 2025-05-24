import { GoColumns } from 'react-icons/go'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { PreviewSwitchback } from './PreviewSwitchback'

import { definePageComponent } from '../definePageComponent'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'

import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'


export const switchback = definePageComponent({
  name: 'switchback',
  title: 'Switchback',
  icon: GoColumns,
  description:
    'A switchback is a component that alternates between an image or video and a block of text.',
  fields: [
    {
      ...eyebrow,
      group: 'content',
    },
    {
      ...heading,
      group: 'content',
      initialValue: {
        headingLevel: 'h3',
        headingSize: '4xl',
        headingWeight: 'medium',
      },
    },
    {
      ...complexComponentBody,
      group: 'content',
    },
    defineField({
      name: 'mediaSide',
      title: 'Media Side',
      type: 'string',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      group: ['media'],
    }),

    // MASKABLE MEDIA FIELDS
    // Maskable Media Fields
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      hidden: ({ parent }) =>
        parent?.alignment === 'vertical' ||
        parent?.rightContentType !== 'media',
      options: {
        list: [
          {
            title: 'Image',
            value: 'image',
          },
          {
            title: 'Image Gallery',
            value: 'imageGallery',
          },
          {
            title: 'Video',
            value: 'video',
          },
          {
            title: 'Testimonials',
            value: 'testimonials',
          },
          {
            title: 'None',
            value: 'none',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      ...richImage,
      name: 'image',
      title: 'Image',
      group: 'media',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'image'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'imageGalleryImages',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      group: 'media',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'imageGallery'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group: 'media',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'video'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],

      group: 'media',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'testimonials'

        return hiddenByThis
      },
    }),
  ],
  components: {
    preview: PreviewSwitchback,
    input: GenericInputWithJsonView,
  },
  preview: {
    select: {
      heading: 'heading.text',
      body: 'body',
      image: 'image',
      mediaSide: 'mediaSide'
    }
  },
})
