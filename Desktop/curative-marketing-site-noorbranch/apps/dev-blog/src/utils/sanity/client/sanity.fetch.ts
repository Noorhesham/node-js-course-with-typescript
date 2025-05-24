import { draftMode } from 'next/headers';

import { client } from '@utils/sanity/client/sanity.client';
import { getStegaConfig } from '@utils/sanity/client/sanity.stega.config';
import { token } from '@utils/sanity/client/sanity.token';

import type { ClientPerspective, QueryParams, StegaConfig } from 'next-sanity';

export interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, 'raw'>;
  stega?: StegaConfig;
}

const isDraftMode = () => {
  try {
    return draftMode().isEnabled;
  } catch {
    return false;
  }
};

export const sanityFetch = async <QueryResponse>({
  query,
  params = {},
  perspective = isDraftMode() ? 'previewDrafts' : 'published',
  stega = getStegaConfig({ perspective }),
}: SanityFetchParams) => {
  if (perspective === 'previewDrafts') {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: 'previewDrafts',
      token,
      useCdn: false,
      // disable cache to avoid slowing down the live preview
      next: { revalidate: 0 },
    });
  }

  return client.fetch<QueryResponse>(query, params, {
    stega: false,
    perspective: 'published',
    useCdn: true,
    // When not in preview mode, cache the response for 60 seconds
    next: { revalidate: 60 },
  });
};
