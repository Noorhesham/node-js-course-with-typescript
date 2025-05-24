import { PAGE_COMPONENT_BACKGROUND_COLORS } from '@/lib'
import { COMMON_PADDING_VALUES } from '@/lib/spacingOptions'
import { defineField } from 'sanity'

export const sharedComponentLayoutFields = [
  defineField({
    name: 'padding',
    title: 'Vertical Padding (Legacy)',
    description:
      'The amount of padding above and below the component, in pixels.',
    type: 'object',
    group: 'layout',
    options: {
      collapsible: true,
      collapsed: true,
      columns: 2,
    },
    readOnly: true,
    deprecated: {
      reason: 'Use the "Responsive Vertical Padding" field instead for better control across breakpoints',
    },
    // Hide this field in new documents where it hasn't been set yet
    hidden: ({ value }) => value === undefined,
    fields: [
      defineField({
        name: 'top',
        title: 'Top',
        type: 'number',
        initialValue: 64,
      }),
      defineField({
        name: 'bottom',
        title: 'Bottom',
        type: 'number',
        initialValue: 64,
      }),
    ],
  }),
  defineField({
    name: 'responsivePadding',
    title: 'Responsive Vertical Padding',
    description: 'Set different padding values for each breakpoint using Tailwind spacing values',
    type: 'object',
    group: 'layout',
    options: {
      collapsible: true,
      collapsed: true,
      columns: 2,
    },
    fields: [
      defineField({
        name: 'default',
        title: 'Default (Mobile)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 48, // 12 in Tailwind
          bottom: 48, // 12 in Tailwind
        },
      }),
      defineField({
        name: 'sm',
        title: 'Small (640px+)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 64, // 16 in Tailwind
          bottom: 64, // 16 in Tailwind
        },
      }),
      defineField({
        name: 'md',
        title: 'Medium (768px+)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 80, // 20 in Tailwind
          bottom: 80, // 20 in Tailwind
        },
      }),
      defineField({
        name: 'lg',
        title: 'Large (1024px+)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 96, // 24 in Tailwind
          bottom: 96, // 24 in Tailwind
        },
      }),
      defineField({
        name: 'xl',
        title: 'Extra Large (1280px+)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 96, // 24 in Tailwind
          bottom: 96, // 24 in Tailwind
        },
      }),
      defineField({
        name: 'twoXl',
        title: '2X Large (1536px+)',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
          columns: 2,
        },

        fields: [
          defineField({
            name: 'top',
            title: 'Top',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
          defineField({
            name: 'bottom',
            title: 'Bottom',
            type: 'number',
            options: {
              list: COMMON_PADDING_VALUES
            },
          }),
        ],
        initialValue: {
          top: 96, // 24 in Tailwind
          bottom: 96, // 24 in Tailwind
        },
      }),
    ],
  }),

  defineField({
    name: 'textColor',
    title: 'Text Color',
    description: 'Use light or dark text for this component?',
    type: 'string',
    options: {
      list: [
        { title: 'Dark Text', value: 'dark' },
        { title: 'Light Text', value: 'light' },
      ],
    },
    initialValue: 'light',
    group: 'layout',
  }),
  defineField({
    name: 'backgroundIsCustomized',
    title: 'Customize Background?',
    type: 'boolean',
    initialValue: false,
    group: 'layout',
  }),
  defineField({
    name: 'backgroundColor',
    title: 'Background Color',
    type: 'simplerColor',
    hidden: ({ parent }) => !parent?.backgroundIsCustomized,
    group: 'layout',
    options: {
      collapsible: false,
      colorList: PAGE_COMPONENT_BACKGROUND_COLORS,
    },
  }),
]
