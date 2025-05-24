import { GoCreditCard } from 'react-icons/go';
import { defineField } from 'sanity';

import { definePageComponent } from '../../definePageComponent';
import { PreviewConversionPanel } from './PreviewConversionPanel';
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'

export const conversionPanel = definePageComponent({
  name: 'conversionPanelReference',
  title: 'Conversion Panel',
  description: 'A panel that encourages user conversion with a testimonial and CTAs',
  icon: GoCreditCard,
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
          {title: 'Blue', value: 'blue'},
        ],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Downloadable Asset', value: 'downloadableAsset'},
          {title: 'Client Story', value: 'clientStory'},
          {title: 'Brand', value: 'brand'},
          {title: 'Internal', value: 'internal'},
          {title: 'Newsletter', value: 'newsletter'},
        ],
      },
      initialValue: 'downloadableAsset',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.variant !== 'downloadableAsset',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
      hidden: ({parent}) => parent?.variant === 'brand' || parent?.theme === 'newsletter' || parent?.theme === 'testimonial',
    }),
    defineField({
      name: 'mobileBgImage',
      title: 'Mobile Background Image',
      type: 'image',
      hidden: ({parent}) => parent?.variant !== 'internal' && parent?.theme !== 'clientStory',
    }),
    defineField({
      name: 'testimonialReference',
      title: 'Testimonial',
      type: 'reference',
      to: [{type: 'testimonial'}],
      hidden: ({parent}) => parent?.variant !== 'clientStory',
    }),
    {
      ...ctaBar,
      title: 'CTAs',
      description:
        'These CTAs will be displayed below the subheading and above the CTA cards.',
      options: {
        allowedCtaTypes: [
          'link',
          'internalLink',
          'download',
          'emailCapture',
        ],
      },
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      subhead: 'subhead',
      testimonialReference: 'testimonialReference',
      variant: 'variant',
      theme: 'theme',
      ctaBar: 'ctaBar',
    },
    prepare: ({ heading, subhead, testimonialReference, variant, theme, ctaBar }) => {
      return {
        title: 'Conversion Panel',
        heading,
        subhead,
        testimonialReference,
        variant,
        theme,
        ctaBar,
      }
    },
  },
  components: {
    preview: PreviewConversionPanel,
  },
});
