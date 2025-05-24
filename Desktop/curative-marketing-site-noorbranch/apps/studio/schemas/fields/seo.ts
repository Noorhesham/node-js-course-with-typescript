// –------------------------------------------------
// SEO (field)
//
// This custom field type collects common SEO settings that can be
// applied to any document type. It includes fields for the page title,
// description, and open graph image, as well as options to prevent
// search engines from indexing or following links on the page.
//
// –------------------------------------------------

import { PrefixedSlugInput } from '@/components/PrefixedSlugInput'
import { defineField } from 'sanity'
import ProgressiveCharCount from '@/components/ProgressiveCharCount'

export const seo = defineField({
  name: 'seo',
  title: 'SEO Settings',
  group: 'seo',
  type: 'object',
  options: {
    includeSlugPrefixInStoredValue: false,
  },
  fieldsets: [
    {
      name: 'searchEngineSettings',
      title: 'Search Engine Settings',
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page.',
      options: {
        // The Generate button will use the parent document's title field to generate the slug.
        source: 'title',
      },
      components: {
        input: PrefixedSlugInput,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that will appear in search engine results. For optimal SEO, use between 50-60 characters to ensure your title displays properly in search results.',
      components: {
        input: ProgressiveCharCount as any
      },
      validation: Rule => Rule
        .min(10)
        .max(70)
        .warning()
        .custom((title) => {
          if (!title) return true
          if (title.length < 50) return 'Title might be too short for optimal SEO (50-60 characters recommended)'
          if (title.length > 60) return 'Title might be too long for optimal SEO (50-60 characters recommended)'
          return true
        })
    },
    {
      name: 'canonicalUrl',
      title: 'Customize Canonical URL',
      type: 'string',
      description: 'Tell search engines which URL should be preferred if the content in this page is available somewhere else on your site.',
      placeholder: 'Leaving this blank will use this content\'s current URL',
      validation: Rule => Rule.warning('Note: Editing this link can affect your organic traffic and isn\'t necessary in most cases.')
    },
    {
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'The description that will appear in search engine results. For optimal SEO, use between 150-160 characters to ensure your description displays properly in search results.',
      components: {
        input: ProgressiveCharCount as any
      },
      rows: 4,
      validation: Rule => Rule
        .min(50)
        .max(180)
        .warning()
        .custom((desc) => {
          if (!desc) return true
          if (desc.length < 150) return 'Description might be too short for optimal SEO (150-160 characters recommended)'
          if (desc.length > 160) return 'Description might be too long for optimal SEO (150-160 characters recommended)'
          return true
        })
    },
    {
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'The image that will appear when this page is shared on social media.',
    },
    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      description:
        'The top-most pages that lead to this page. The first item should be the homepage.',
      type: 'array',
      // TODO: Expand this list of types over time.
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      // TODO: Remove this once we have breadcrumbs implemented
      hidden: true,
    }),

    // Search Engine Settings
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      fieldset: 'searchEngineSettings',
      description: 'Prevent search engines from indexing this page.',
      initialValue: false,
    },
    {
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      fieldset: 'searchEngineSettings',
      description: 'Prevent search engines from following links on this page.',
      initialValue: false,
    },
  ],
})
