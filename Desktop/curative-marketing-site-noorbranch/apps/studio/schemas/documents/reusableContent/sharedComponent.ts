import { ComponentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'
import { COMPONENT_TYPES, COMPONENT_GROUPS } from '@/lib/consts'
import * as componentSchemas from '@/schemas/componentSchemas'
import { PreviewReusableContent } from '@/schemas/documents/reusableContent/PreviewReusableContent'
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { defineCalloutUIField } from '@/schemas/utilities'
import { alphabetizeByType } from '@/utils'

// Create a mapping of all available components
const components = {
  ...componentSchemas,
  simpleEmbeddedForm,
}


export const sharedComponent = defineType({
  name: 'sharedComponent',
  title: 'Shared Component',
  description: 'A component that can be shared across multiple pages.',
  icon: ComponentIcon,
  type: 'document',
  fields: [
    defineCalloutUIField({
      heading: 'This is a Shared Component.',
      body: 'Shared components are reusable pieces of content that can be used across multiple pages. They are a great way to maintain consistency and reduce duplication.',
    }),
    defineField({
      name: 'name',
      title: 'Component Name',
      description: 'This is used to identify the component in Sanity.',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description:
        'These components will be displayed wherever this shared component is used.',
      type: 'array',
      of: alphabetizeByType(
        COMPONENT_TYPES.map(type => {
          const component = components[type]
          if (!component) {
            throw new Error(`Component ${type} not found in components`)
          }
          return component
        })
      ),
      components: {
        input: ArrayInputWithJsonView,
      },
      options: {
        insertMenu: {
          filter: true,
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/componentPreviews/${schemaTypeName}.png`,
            },
            { name: 'list' },
          ],
          groups: Object.values(COMPONENT_GROUPS).map(group => ({
            name: group.name,
            title: group.title,
            of: group.components,
          })),
        },
      },
    }),
  ],
  components: {
    preview: PreviewReusableContent,
  },
})
