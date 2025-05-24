import { defineField } from 'sanity'

import { definePageComponent } from '../definePageComponent'
import { BiBriefcase } from 'react-icons/bi'

export const jobListingPanel = definePageComponent({
  name: 'jobListingPanel',
  title: 'Job Listing Panel',
  description: 'A panel listing jobs pulled in from Greenhouse',
  icon: BiBriefcase,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Job Listing Panel',
      hidden: true,
    }),
  ],
})
