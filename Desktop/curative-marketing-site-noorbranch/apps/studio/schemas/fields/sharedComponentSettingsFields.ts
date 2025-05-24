import { type FieldDefinition, defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const sharedComponentSettingsFields: FieldDefinition[] = [
  defineField({
    name: 'sectionId',
    title: 'Section ID',
    description: 'The ID of the section, used for linking to this section.',
    type: 'slug',
    group: 'settings',
    options: {
      source: (_, options) => {
        if (!options.parent) return

        const { title, name, heading, _key, _type } = options.parent as {
          title?: string
          name?: string
          heading?: { text?: string }
          _key: string
          _type: string
        }

        const typeAndKey = `${_type}-${_key}`

        return title || name || blockPreview(heading?.text) || typeAndKey
      },
      // Leaving this alone would throw errors across pages, so I'm setting it to true
      isUnique: () => true,
    },
    validation: (Rule) =>
      Rule.custom((value) => {
        if (!value) return true

        if (value.current?.startsWith('#')) {
          return "You don't need to include the '#' symbol in the section ID."
        }

        return true
      }),
  }),
]
