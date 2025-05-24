import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewSpotlightSlider } from './PreviewSpotlightSlider'

export const spotlightSlider = definePageComponent({
  name: 'spotlightSlider',
  title: 'Spotlight Slider',
  description: 'Spotlight Slider',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    }),
    defineField({
      name: 'sliders',
      title: 'Sliders',
      type: 'array',
      validation: (Rule) => Rule.max(10),
      of: [
        defineField({
          name: 'slider',
          title: 'Slider',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            {
              name: 'subhead',
              title: 'Sub Head',
              type: 'simpleRichText',
            },
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      internalName: 'internalName',
      sliders: 'sliders',
    },
  },
  components: {
    preview: PreviewSpotlightSlider
  },
})
