import { DotIcon } from '@sanity/icons'
import { Box, Flex } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface PreviewListProps extends PreviewProps {
  direction: 'vertical' | 'horizontal'
  items: {
    heading: string
  }[]
}

export const PreviewList = (props: PreviewListProps) => {
  const { renderDefault, items, direction } = props

  if (!items) {
    return <div>Add list items to see them here.</div>
  }

  const directionString = direction === 'vertical' ? 'Vertical' : 'Horizontal'
  const flexDirection = direction === 'vertical' ? 'column' : 'row'

  return (
    <Box>
      {renderDefault({ ...props, title: `${directionString} List` })}
      <Flex direction={flexDirection} wrap="wrap" gap={2} padding={2}>
        {items.map((item) => (
          <Flex key={item.heading} direction="row" gap={1} align="center">
            <DotIcon />
            {item.heading}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
