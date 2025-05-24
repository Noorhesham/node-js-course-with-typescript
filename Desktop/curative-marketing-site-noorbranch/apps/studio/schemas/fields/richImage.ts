// –------------------------------------------------
// RICH IMAGE (field)
//
// This custom field type extends the default image field with
// additional fields for alt text and a caption. It also enables
// the hotspot feature by default.
//
// –------------------------------------------------

import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const richImage = defineField({
  name: 'richImage',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
    collapsible: true,
    aiAssist: {
      imageDescriptionField: 'alt',
    },
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      description: 'A brief description of the image for screen readers.',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.required().warning('You should provide alt text for this image.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'A brief description of the image.',
      type: 'text',
      rows: 2,
    }),
  ],
  // By default, Sanity uses an image's filename as title for the preview
  // This overrides that to show the caption and alt text instead
  // It also displays a warning if no alt text is provided
  preview: {
    select: {
      alt: 'alt',
      caption: 'caption',
      media: 'asset',
      filename: 'asset.originalFilename',
    },
    prepare({ alt, caption, media, filename }) {
      const title = caption || alt || 'No caption or alt text given'
      const subtitle = filename

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
