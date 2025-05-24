import {
  BarChartIcon,
  EditIcon,
  HashIcon,
  TagIcon,
  WrenchIcon,
  SortIcon,
  EyeOpenIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { clientStoryCategories } from '../fields/clientStoryCategories'
import { richImage } from '../fields/richImage'

import { metric } from '@/schemas/fields/metric'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { seo } from '@/schemas/fields/seo'
import { PreviewClientStory } from './clientStory/PreviewClientStory'
import BodyInputForToc from '@/components/BodyInputForToc'

interface OrderedDoc {
  _id: string;
  title: string;
  displayOrder: number;
}

export const clientStory = defineType({
  name: 'clientStory',
  title: 'Client Story',
  type: 'document',
  icon: BarChartIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'display',
      title: 'Display',
      icon: EyeOpenIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'categories',
      title: 'Categories',
      icon: TagIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
    {
      name: 'ordering',
      title: 'Ordering',
      icon: SortIcon,
    },
  ],
  fieldsets: [
    { name: 'overview', title: 'Overview', options: { collapsible: true } },
    {
      name: 'display',
      title: 'Display Options',
      options: { collapsible: true }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This title will be displayed on the site.',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().error('You must provide a title for this case study.'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      group: 'display',
      options: {
        list: [
          { title: 'Wall', value: 'wall' },
          { title: 'Bento', value: 'bento' }
        ],
        layout: 'radio'
      },
      initialValue: 'wall',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Control the order of client stories in listings. Lower numbers appear first. Duplicate numbers will be automatically adjusted.',
      type: 'number',
      group: 'ordering',
      initialValue: async (context: { getClient: () => any }) => {
        if (!context?.getClient) return 0;

        // Get total count of documents
        const count = await context.getClient().fetch(`
          count(*[_type == "clientStory"])
        `, { apiVersion: '2023-05-03' })

        return count + 1
      },
      validation: Rule =>
        Rule.integer()
          .min(0)
          .custom(async (value: number | undefined, context: any) => {
            if (!context?.document?._id || !context?.getClient) return true;
            if (value === undefined) return true;

            try {
              const client = context.getClient({ apiVersion: '2023-05-03' });
              const currentDocId = context.document._id;

              // Find any documents with the same or higher order
              const existingDocs = await client.fetch<OrderedDoc[]>(`
                *[_type == "clientStory" && 
                  displayOrder >= $order && 
                  _id != $currentId
                ] | order(displayOrder asc) {
                  _id,
                  title,
                  displayOrder
                }
              `, {
                order: value,
                currentId: currentDocId
              });

              // If we found conflicting documents
              if (existingDocs.length > 0) {
                // Start a transaction
                const transaction = client.transaction();

                // Get the document that currently has our desired order
                const conflictingDoc = existingDocs.find(doc => doc.displayOrder === value);

                if (conflictingDoc) {
                  // Shift all documents with same or higher order up by one
                  existingDocs.forEach((doc: OrderedDoc) => {
                    transaction.patch(doc._id, {
                      set: { displayOrder: doc.displayOrder + 1 }
                    });
                  });

                  // Commit the transaction
                  await transaction.commit();

                  // Return true to allow the current document to take the desired position
                  return true;
                }
              }

              return true;
            } catch (error) {
              console.error('Error handling display order:', error);
              return 'Error handling order. Please try again.';
            }
          }),
    }),
    defineField({
      name: 'displaySize',
      title: 'Display Size',
      type: 'string',
      group: 'display',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' }
        ],
        layout: 'radio'
      },
      initialValue: 'medium',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),

    // Metrics
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [metric],
      group: 'content',
      // Can have between 0 and 3 metrics
      validation: (Rule) =>
        Rule.max(3).error('You can only have up to 3 metrics.'),
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      group: 'content',
      hidden: true,
      of: [{
        type: 'object',
        name: 'tocItem',
        title: 'Table of Contents Item',
        preview: {
          select: {
            title: 'title',
            level: 'level'
          },
          prepare({ title, level }) {
            return {
              title: `H${level}: ${title}`
            }
          }
        },
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title'
          },
          {
            name: 'originalTitle',
            type: 'string',
            title: 'Original Title'
          },
          {
            name: 'level',
            type: 'number',
            title: 'Heading Level'
          },
          {
            name: 'sectionId',
            type: 'string',
            title: 'Section ID'
          },
          {
            name: 'hidden',
            type: 'boolean',
            title: 'Hidden',
            initialValue: false
          },
          {
            name: 'order',
            type: 'number',
            title: 'Order'
          }
        ]
      }]
    }),
    defineField({
      name: 'enableTableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'complexRichText',
      group: 'content',
      components: {
        input: BodyInputForToc
      }
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A brief summary of the content.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      group: 'content',
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    defineField({
      name: 'authors',
      title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
      group: 'content',
    }),
    publicationDates,
    clientStoryCategories,
    {
      ...seo,
      options: {
        slugPrefix: 'client-stories',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this case study from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        'Use this name for internal reference only. It will not be displayed on the site.',
      type: 'string',
      group: 'settings',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' }
      ]
    },
    {
      title: 'Creation Date',
      name: 'createdAtDesc',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Last Updated',
      name: 'updatedAtDesc',
      by: [
        { field: '_updatedAt', direction: 'desc' }
      ]
    }
  ],
  components: {
    preview: PreviewClientStory
  },
  preview: {
    select: {
      title: 'title',
      slug: 'seo.slug.current',
      media: 'featuredImage',
      displayOrder: 'displayOrder',
      displayType: 'displayType',
      company: 'company.name'
    },
    prepare: ({ title, slug, media, displayOrder, displayType, company }) => ({
      title: title,
      subtitle: `${company ? `${company} | ` : ''}${displayType?.toUpperCase()} | Order: ${displayOrder}`,
      media: media
    })
  },
})
