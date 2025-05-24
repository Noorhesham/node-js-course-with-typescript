import { genericEmbeddedForm } from '@/schemas/fields/embeddedForm/genericEmbeddedForm'
import { defineField } from 'sanity'
import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'

export const simpleEmbeddedForm = defineField({
  ...genericEmbeddedForm,
  fields: [
    genericEmbeddedForm.fields[0],
    ...genericEmbeddedForm.fields.slice(1),
    ...sharedComponentLayoutFields,
  ],
})
