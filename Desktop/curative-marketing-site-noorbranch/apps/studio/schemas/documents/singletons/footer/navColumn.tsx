import { Box, Text } from '@sanity/ui'
import { type PreviewProps, defineField } from 'sanity'
import { footerNavLink } from './footerNavLink'

type FooterNavLink = {
  _type: 'footerNavLink'
  text: string
  isHeading: boolean
}

interface PreviewNavColumnProps extends PreviewProps {
  navItems: FooterNavLink[]
}

const PreviewNavColumn = (props: PreviewNavColumnProps) => {
  const { renderDefault, navItems } = props

  if (!navItems || navItems.length === 0) {
    return renderDefault(props)
  }

  const itemCount = navItems.length

  return (
    <Box>
      {renderDefault({
        ...props,
        subtitle: `${itemCount} item${itemCount > 1 ? 's' : ''}`,
      })}
      <Box margin={3} marginTop={2}>
        {navItems.map((item, index) => {
          const key = `${item._type}-${index}`
          if (item._type === 'footerNavLink') {
            return (
              <Box
                key={key}
                marginBottom={3}
                marginTop={item.isHeading && index !== 0 ? 4 : undefined}
              >
                <Text size={1} weight={item.isHeading ? 'bold' : undefined}>
                  {item.text}
                </Text>
              </Box>
            )
          }

          if (item._type === 'divider') {
            return (
              <Box key={key} marginTop={4} marginBottom={3}>
                <hr />
              </Box>
            )
          }

          if (item._type === 'footerBadgeRow') {
            return (
              <Box key={key} marginBottom={2}>
                <Text size={1} muted>
                  [Badge Row]
                </Text>
              </Box>
            )
          }

          return null
        })}
      </Box>
    </Box>
  )
}

export const navColumn = defineField({
  name: 'navColumn',
  title: 'Navigation Column',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [footerNavLink],
    }),
  ],
  preview: {
    select: {
      navItems: 'items',
    },
    prepare({ navItems }) {
      return {
        title: 'Navigation Column',
        navItems,
      }
    },
  },
  components: {
    // @ts-ignore
    preview: PreviewNavColumn,
  },
})
