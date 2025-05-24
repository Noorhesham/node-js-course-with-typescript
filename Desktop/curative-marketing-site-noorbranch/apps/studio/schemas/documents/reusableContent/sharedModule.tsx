import { ComponentIcon } from '@sanity/icons'
import { GoCreditCard, GoHorizontalRule } from 'react-icons/go'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'
import { imageGallery } from '@/schemas/componentSchemas/imageGallery'
import { PreviewReusableContent } from '@/schemas/documents/reusableContent/PreviewReusableContent'
import { anchor } from '@/schemas/fields/anchor'
import { testimonialCard } from '@/schemas/componentSchemas/modules/testimonialCard/testimonialCard'
import { conversionPanel } from '@/schemas/componentSchemas/modules/conversionPanel'
import { ctaField } from '@/schemas/fields/ctaField'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { richImage } from '@/schemas/fields/richImage'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { defineCalloutUIField } from '@/schemas/utilities'
import { alphabetizeByType } from '@/utils'


export const sharedModule = defineType({
  name: 'sharedModule',
  title: 'Shared Module',
  description: 'A component that can be shared on rich text box.',
  icon: ComponentIcon,
  type: 'document',
  fields: [
    defineCalloutUIField({
      heading: 'This is a Shared Module.',
      body: 'Shared modules are reusable pieces of content that can be used in the rich text. They are a great way to maintain consistency and reduce duplication.',
    }),
    defineField({
      name: 'name',
      title: 'Module Name',
      description: 'This is used to identify the module in Sanity.',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description:
        'These modules can be added wherever this shared module is used.',
      type: 'array',
      of: alphabetizeByType([
        defineArrayMember({
          type: 'block',
          // These blocks can be added inline with text in the editor
          of: [tokenReference],
          // This config limits the styles that can be applied to text in the editor
          // Specifically, this removes the default H1 option to avoid conflict
          // with the blog post title.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            annotations: [link, internalLink],
          },
        }),
        richImage,
        imageGallery,
        testimonialCard,
        defineArrayMember({
          name: 'videoReference',
          title: 'Video',
          type: 'reference',
          to: [{ type: 'video' }],
        }),
        anchor,
        defineArrayMember({
          name: 'hr',
          title: 'Horizontal Rule',
          icon: GoHorizontalRule,
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              initialValue: 'hr',
              hidden: true,
            },
          ],
          components: {
            preview: () => <hr />,
          },
        }),
        conversionPanel,
      ]),
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
        },
      },
    }),
  ],
  components: {
    preview: PreviewReusableContent,
  },
})
