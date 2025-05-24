import { genericEmbeddedForm } from '@/schemas/fields/embeddedForm/genericEmbeddedForm'
import { defineField } from 'sanity'

export const embeddedFormForResources = defineField({
  ...genericEmbeddedForm,
  fields: [
    genericEmbeddedForm.fields[0],
    ...genericEmbeddedForm.fields.slice(1),
  ],
})
