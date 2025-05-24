import { CodeBlockIcon } from '@sanity/icons'
import { MonospaceTextInput } from '@/components/MonospaceTextInput'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'

export const embed = definePageComponent({
  name: 'embed',
  title: 'Embed',
  description: 'Embed a code snippet or iframe.',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      components: {
        input: MonospaceTextInput,
      },
    }),
  ],
  preview: {
    select: {
      code: 'code',
    },
    prepare({ code }) {
      return {
        title: 'Embed Block',
        subtitle: code,
      }
    },
  },
})
