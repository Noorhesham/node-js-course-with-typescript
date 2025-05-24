import { SiHubspot } from 'react-icons/si'
import { defineField, defineType } from 'sanity'

import FormLogicInput from '@/components/FormLogicInput'
import { hubspotFormLogicItem } from './hubspotFormLogicItem'

export const hubspotForm = defineType({
  name: 'hubspotForm',
  title: 'HubSpot Form',
  type: 'document',
  icon: SiHubspot,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        "This is the name that will be used to reference this form in the code. Try to use something that makes this form's purpose clear.",
      type: 'string',
    }),
    defineField({
      name: 'formData',
      title: 'Form Data',
      description: 'This is logic to show the form',
      type: 'object',
      fields: [
        defineField({
          name: 'formId',
          title: 'Form ID',
          description: 'This is the ID of the form in Marketo.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'logicGroup',
          title: 'Logic Group',
          type: 'array',
          of: [hubspotFormLogicItem],
        }),
      ],
      components: {
        input: FormLogicInput,
      },
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'formData.formId',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `Form ID: ${subtitle}`,
    }),
  },
})
