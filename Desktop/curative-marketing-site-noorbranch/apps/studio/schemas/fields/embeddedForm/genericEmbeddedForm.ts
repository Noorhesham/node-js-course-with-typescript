import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { REFERENCABLE_DOCUMENT_TYPES } from '@/schemas/fields/linkTypes/internalLink'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'
import { TbForms } from 'react-icons/tb'
import { defineField } from 'sanity'
import { PanelRightIcon, ExpandIcon, ControlsIcon } from '@sanity/icons'

export const genericEmbeddedForm = defineField({
  name: 'embeddedForm',
  title: 'Form',
  icon: TbForms,
  type: 'object',
  groups: [
    {
      name: 'left',
      title: 'Left',
      icon: PanelRightIcon,
      default: true,
    },
    {
      name: 'mainForm',
      title: 'Form',
      icon: TbForms,
    },
    {
      name: 'layout',
      title: 'Layout',
      icon: ExpandIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: ControlsIcon,
    },
  ],
  fieldsets: [
    {
      name: 'samePageThankYou',
      title: 'Custom thank you message',
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
  ],
  fields: [
    ...sharedComponentSettingsFields,
    {
      ...eyebrow,
      title: 'Standard Eyebrow',
      group: 'left',
    },
    {
      ...heading,
      initialValue: {
        headingLevel: 'h1',
        headingSize: '5xl',
      },
      group: 'left',
    },
    {
      ...complexComponentBody,
      name: 'body',
      title: 'Body',
      group: 'left',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
    },
    defineField({
      name: 'hubspotForm',
      title: 'Hubspot Form',
      type: 'reference',
      to: [{ type: 'hubspotForm' }],
      group: 'mainForm',
    }),

    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      description:
        'The text to display on the submit button. If not provided, the default will be used.',
      type: 'string',
      group: 'mainForm',
    }),

    defineField({
      name: 'submitBehavior',
      title: 'Submit Behavior',
      type: 'string',
      group: 'mainForm',
      options: {
        list: [
          {
            title: 'Stay on Page',
            value: 'stayOnPage',
          },
          {
            title: 'Redirect to Other URL',
            value: 'otherRedirect',
          },
        ],
      },
      initialValue: 'stayOnPage',
    }),

    defineField({
      name: 'thankYouHeadline',
      title: 'Thank You Headline Override',
      description:
        'The headline to display after the form is submitted. If not provided, the default will be used.',
      type: 'string',
      fieldset: 'samePageThankYou',
      hidden: ({ parent }) => parent?.submitBehavior !== 'stayOnPage',
      group: 'mainForm',
    }),
    defineField({
      name: 'enrichViaClearbit',
      title: 'Enrich Form Data via Clearbit',
      description: 'When enabled, form data will be enriched with Clearbit data when available',
      type: 'boolean',
      initialValue: false,
      group: 'mainForm',
    }),
    defineField({
      name: 'segmentTrackEvent',
      title: 'Segment Track Event',
      type: 'string',
      options: {
        list: [
          { title: 'Discovery Call Requested', value: 'Discovery Call Requested' },
          { title: 'Newsletter Subscribed', value: 'Newsletter Subscribed' },
          { title: 'Guide Downloaded', value: 'Guide Downloaded' },
          { title: 'Checklist Downloaded', value: 'Checklist Downloaded' },
          { title: 'Playbook Downloaded', value: 'Playbook Downloaded' },
          { title: 'Ebook Downloaded', value: 'Ebook Downloaded' },
          { title: 'Referral Program Requested', value: 'Referral Program Requested' },
          { title: 'Event Registered', value: 'Event Registered' }
        ]
      },
      group: 'mainForm'
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank You Message Override',
      description:
        'The message to display after the form is submitted. If not provided, the default message will be used.',
      type: 'simpleRichText',
      fieldset: 'samePageThankYou',
      hidden: ({ parent }) => parent?.submitBehavior !== 'stayOnPage',
      group: 'mainForm',
    }),

    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL',
      description:
        'An optional URL to redirect to after the form is submitted.',
      type: 'object',
      hidden: ({ parent }) => parent?.submitBehavior !== 'otherRedirect',
      options: {
        collapsible: false,
      },
      group: 'mainForm',
      validation: (Rule) =>
        Rule.custom((fieldValue, context) => {
          const value = fieldValue as {
            actionType?: 'link' | 'internalLink'
            href?: string
            reference?: { _ref: string }
          }

          const parent = context.parent as { submitBehavior: string }

          const shouldRedirectOnSubmit =
            parent?.submitBehavior === 'otherRedirect'

          if (!shouldRedirectOnSubmit) return true

          if (!value?.actionType) {
            return 'You must provide specify a redirect URL type.'
          }

          if (value.actionType === 'link' && !value.href) {
            return 'You must provide a URL to redirect to.'
          }

          if (value.actionType === 'internalLink' && !value.reference) {
            return 'You must provide a document to redirect to.'
          }

          return true
        }),
      fields: [
        defineField({
          name: 'actionType',
          title: 'Action Type',
          type: 'string',
          options: {
            list: ['link', 'internalLink'],
          },
          initialValue: undefined,
        }),

        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          hidden: ({ parent }) => parent?.actionType !== 'link',
        }),

        defineField({
          name: 'reference',
          title: 'Page',
          description: 'Select a document to link to',
          type: 'reference',
          to: REFERENCABLE_DOCUMENT_TYPES.map((type) => ({ type })),
          hidden: ({ parent }) => parent?.actionType !== 'internalLink',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Form Block',
      }
    },
  },
})
