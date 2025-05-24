import { FaQuoteLeft } from 'react-icons/fa';
import { defineField } from 'sanity';

import { definePageComponent } from '../../definePageComponent';
import { PreviewTestimonialCard } from './PreviewTestimonialCard';

export const testimonialCard = definePageComponent({
  name: 'testimonialCard',
  title: 'Testimonial Card',
  description: 'A component that displays a testimonial with theme options',
  icon: FaQuoteLeft,
  fields: [
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Blue', value: 'blue'},
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
  ],
  preview: {
    select: {
      theme: 'theme',
      testimonial: 'testimonial',
    },
    prepare: ({ theme, testimonial }) => {
      return {
        title: 'Testimonial Card',
        theme,
        testimonial,
      }
    },
  },
  components: {
    preview: PreviewTestimonialCard,
  },
});
