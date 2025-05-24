import { defineField } from 'sanity'
import { COMPONENT_TYPES, COMPONENT_GROUPS } from '@/lib/consts'
import * as componentSchemas from '../componentSchemas'
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { alphabetizeByType } from '@/utils'
import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'

// Create a mapping of all available components
const components = {
  ...componentSchemas,
  simpleEmbeddedForm,
}

export const pageBody = defineField({
  name: 'body',
  title: 'Body',
  group: 'content',
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
})
