import { imageBlock } from '@/schemas/componentSchemas/imageBlock'
import { metricsBar } from '@/schemas/componentSchemas/metricsBar'
import { trustBar } from '@/schemas/componentSchemas/trustBar'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import {
  defineArrayMember,
  defineField,
  type BlockDecoratorProps,
} from 'sanity'
import { tokenReference } from '../tokenReference'
import { featuredContent } from './featuredContent'
import { featuredTestimonial } from './featuredTestimonial'
import { list } from './list/list'
import { COLORS } from '@/lib'

const GrayDecorator = (props: BlockDecoratorProps) => (
  <span style={{ color: COLORS.gray[400] }}>{props.children}</span>
)

const ColorDot = (props: { color: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: '1em',
      height: '1em',
      transform: 'translateY(0.125em)',
      backgroundColor: props.color,
      borderRadius: '50%',
    }}
  />
)

export const complexComponentBody = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  group: 'content',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        annotations: [link, internalLink],
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Code', value: 'code' },
          {
            title: 'Gray',
            value: 'gray-400',
            icon: () => <ColorDot color={COLORS.gray[400]} />,
            component: GrayDecorator,
          },
        ],
      },
      of: [tokenReference],
    }),
    {
      ...ctaBar,
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'download'],
      },
    },
    featuredContent,
    featuredTestimonial,
    imageBlock,
    list,
    metricsBar,
    trustBar,
  ],
})
