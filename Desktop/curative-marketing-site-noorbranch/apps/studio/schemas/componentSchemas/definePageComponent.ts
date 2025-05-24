import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'
import {
  CogIcon,
  EditIcon,
  ExpandIcon,
  ImageIcon,
  PanelLeftIcon,
} from '@sanity/icons'
import type { ComponentType, ReactNode } from 'react'
import { TbForms } from 'react-icons/tb'
import {
  type FieldDefinition,
  type FieldGroup,
  type PreviewConfig,
  defineField,
} from 'sanity'

interface FieldDefinitionOptions {
  name: string
  title: string
  description: string
  type?: string
  icon?: ReactNode | ComponentType
  groups?: FieldGroup[]
  fieldsets?: {
    name: string
    title: string
    options?: { collapsible: boolean; collapsed: boolean }
  }[]
  fields?: FieldDefinition[]
  preview?: PreviewConfig
  components?: Record<string, ComponentType>
}

export const definePageComponent = ({
  name,
  title,
  description,
  groups = [],
  fieldsets = [],
  fields = [],
  preview,
  components,
  icon,
  type = 'object',
}: FieldDefinitionOptions) => {
  return defineField({
    name,
    title,
    description,
    icon,
    type,
    preview,
    components: {
      ...components,
      // input: GenericInputWithJsonView,
    },
    // @ts-expect-error - this is a valid type
    groups: [
      {
        name: 'content',
        title: 'Content',
        icon: EditIcon,
        default: true,
      },
      {
        name: 'right',
        title: 'Right',
        icon: PanelLeftIcon,
      },
      {
        name: 'media',
        title: 'Media',
        icon: ImageIcon,
      },
      {
        name: 'form',
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
        icon: CogIcon,
      },
      ...groups,
    ],
    fieldsets,
    fields: [
      ...fields.map((field) => ({
        ...field,
        group: field.group ? field.group : 'content',
      })),
      ...sharedComponentLayoutFields,
      ...sharedComponentSettingsFields,
    ],
  })
}
