// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { COLORS } from '@/lib'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { type BlockDecoratorProps, defineArrayMember, defineType } from 'sanity'

const PurpleDecorator = (props: BlockDecoratorProps) => (
  <span style={{ color: COLORS.purple }}>{props.children}</span>
)

const DarkBlueDecorator = (props: BlockDecoratorProps) => (
  <span style={{ color: COLORS.primary[900] }}>{props.children}</span>
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

export const colorablePlainText = defineType({
  name: 'colorablePlainText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      of: [tokenReference],
      styles: [],
      lists: [],
      marks: {
        annotations: [],
        decorators: [
          {
            title: 'Purple',
            value: 'purple-700',
            icon: () => <ColorDot color={COLORS.purple} />,
            component: PurpleDecorator,
          },
          {
            title: 'Dark Blue',
            value: 'primary-900',
            icon: () => <ColorDot color={COLORS.primary[900]} />,
            component: DarkBlueDecorator,
          },
          {
            title: 'Light',
            value: 'font-light',
            icon: () => <span>L</span>,
          },
        ],
      },
    }),
  ],
})
