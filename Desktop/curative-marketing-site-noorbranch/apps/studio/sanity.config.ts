import type { SanityFormConfig } from 'sanity';
import { defineConfig } from 'sanity';

import { devBanner } from './plugins/devBanner'
import { blogHomepageSingleton } from './plugins/blogHomepageSingleton'
import { schemas } from './schemas'

import { assist } from '@sanity/assist'
import { googleMapsInput } from '@sanity/google-maps-input'
import { defineDocuments, presentationTool } from '@sanity/presentation'
import { visionTool } from '@sanity/vision'
import { iconPicker } from 'sanity-plugin-icon-picker'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { structureTool } from 'sanity/structure'

import { webstacksGlyphDark } from './lib/webstacksGlyphDark'
import { webstacksGlyphLight } from './lib/webstacksGlyphLight'

import './static/studioStyles.css'

import { dataset, projectId, studioApiVersion } from './lib/api'
import { locationResolver } from './lib/locationResolver'
import { resolveDocForRoute } from './lib/resolveRouteForDoc'
import { structure } from './lib/structure'

const presentationOrigin = process.env.SANITY_STUDIO_PREVIEW_URL_ORIGIN;

const plugins = [
  structureTool({
    structure,
  }),
  presentationTool({
    name: 'live-editing',
    title: 'Live Editing',
    previewUrl: {
      origin: process.env.SANITY_STUDIO_PREVIEW_URL_ORIGIN,
      previewMode: {
        enable: '/api/draft',
      },
      // Enhanced debug logging and error handling
      prepare: (url) => {
        try {
          // Add required parameters for draft mode
          url.searchParams.append('preview', 'true');
          
          return url;
        } catch (error) {
          console.error('Error preparing preview URL:', error);
          throw error;
        }
      },
    },
    resolve: {
      mainDocuments: defineDocuments([
        {
          route: '/(.*)',
          // @ts-expect-error - valid filter params can include records with a string array value
          resolve: resolveDocForRoute,
        },
      ]),
      locations: locationResolver,
    },
  }),
  media(),
  visionTool({ defaultApiVersion: studioApiVersion }),
  assist(),
  simplerColorInput(),
  iconPicker(),
  googleMapsInput({
    apiKey: 'AIzaSyC1YsTLVoeG00v5qSUwfe3sEC8E-hp_q8U'
  }),
  blogHomepageSingleton()
]

const schema = { types: schemas }

const form: SanityFormConfig = {
  file: {
    assetSources: (previousAssetSources) => previousAssetSources.filter(
        (assetSource) => assetSource !== mediaAssetSource,
      ),
  },
  image: {
    assetSources: (previousAssetSources) => {
      // Only use the media plugin source
      return [mediaAssetSource]
    }
  },
}

const beta = {
  // treeArrayEditing: {
  //   enabled: true,
  // },
}

// ENVIRONMENT-SPECIFIC CONFIGS

const prodConfig = defineConfig({
  title: 'Production',
  name: 'production',
  dataset: dataset,
  basePath: '/production',
  icon: webstacksGlyphLight,

  beta,
  projectId,
  plugins,
  schema,
  form,
})

const devConfig = defineConfig({
  title: 'Development',
  name: 'development',
  dataset: dataset,
  basePath: '/development',
  icon: webstacksGlyphDark,
  beta,
  projectId,
  plugins: [
    devBanner(),
    ...plugins
  ],
  schema,
  form,
})

// Export both configs as workspaces
export default [
  prodConfig,
  devConfig
]
