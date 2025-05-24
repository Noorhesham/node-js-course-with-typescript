import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewJobListing } from './PreviewJobListing'

export const jobListing = definePageComponent({
  name: 'jobListing',
  title: 'Job Listing - Greenhouse',
  description: 'Job Listing - Greenhouse',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Job Listing',
      subtitle: undefined
    })
  },
  components: {
    preview: PreviewJobListing
  },
})
