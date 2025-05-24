import urlBuilder from '@sanity/image-url'

export const PROJECT_ID = 'q9c9g16o'
export const DATASET = 'dev'

export const imageBuilder = urlBuilder({
  projectId: 'q9c9g16o', // Replace with your Sanity project ID
  dataset: 'dev', // Replace with your Sanity dataset
})
