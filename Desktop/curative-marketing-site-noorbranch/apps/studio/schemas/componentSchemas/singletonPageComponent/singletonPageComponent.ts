import { alphabetizeByTitle, convertCamelCaseToTitleCase } from '@/utils'
import { defineField } from 'sanity'

export const singletonPageComponent = defineField({
  name: 'singletonPageComponent',
  title: 'Singleton Page Component',
  description:
    'A component with variants specific to a single page, such as the case study listing page.',
  type: 'object',
  fields: [
    {
      name: 'component',
      title: 'Component',
      type: 'string',
      options: {
        list: alphabetizeByTitle([
          { title: 'Case Studies Listing', value: 'caseStudyListing' },
          { title: 'Events Listing', value: 'eventListing' },
          { title: 'Blog Posts Listing', value: 'blogPostListing' },
          { title: 'Resource Hub', value: 'resourceHub' },
          {
            title: 'Reports and Guides Listing',
            value: 'reportsAndGuidesListing',
          },
          {
            title: 'Glossary',
            value: 'glossary',
          },
          { title: 'Videos Listing', value: 'videoListing' },
          {
            title: 'Technology Partners Listing',
            value: 'technologyPartnersListing',
          },
        ]),
      },
    },
  ],
  preview: {
    select: {
      title: 'component',
    },
    prepare({ title }) {
      const formattedTitle = convertCamelCaseToTitleCase(title)
      return {
        title: formattedTitle,
      }
    },
  },
})
