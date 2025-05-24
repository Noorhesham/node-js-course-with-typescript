import { createClient } from '@sanity/client';
import { env } from '../../../config/env';

export const client = createClient({
  apiVersion: env.sanity.apiVersion,
  dataset: env.sanity.dataset,
  projectId: env.sanity.projectId,
  useCdn: !env.sanity.token, // Disable CDN when using token
  perspective: 'published',
  token: env.sanity.token,
  stega: {
    enabled: true,
    studioUrl: env.sanity.studioUrl,
  },
});

export function getClient(preview = false) {
  if (preview) {
    return client.withConfig({
      token: env.sanity.token,
      useCdn: false,
      perspective: 'previewDrafts',
    });
  }
  return client;
}
