import { createClient } from '@sanity/client'
import urlBuilder from '@sanity/image-url'

export const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
export const USECDN = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true'
export const APIVERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

if (!PROJECT_ID || !DATASET) {
  throw new Error(
    'Sanity Project ID and Dataset must be defined in the environment variables.',
  )
}

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: USECDN,
  apiVersion: APIVERSION,
})

export const imageBuilder = urlBuilder({
  projectId: PROJECT_ID,
  dataset: DATASET,
})
