export const env = {
  sanity: {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '',
    token: process.env.SANITY_READ_TOKEN || '',
  },
};
