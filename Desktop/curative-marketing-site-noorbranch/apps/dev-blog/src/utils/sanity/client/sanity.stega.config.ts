import { ClientPerspective, StegaConfig } from 'next-sanity';

/**
 * Get the stega configuration based on the perspective
 * @param param0 - The perspective to use
 * @returns The stega configuration
 */
export function getStegaConfig({
  perspective,
}: {
  perspective: Omit<ClientPerspective, 'raw'>;
}): StegaConfig {
  if (perspective === 'previewDrafts') {
    return {
      enabled: true,
      studioUrl: '/studio',
    };
  }

  return {
    enabled: false,
  };
}
