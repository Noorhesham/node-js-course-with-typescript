import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewContentGridProps extends PreviewProps {
  cards: {
    heading: string
    body: TypedObject[]
  }[]
}

export const PreviewContentGrid = (props: PreviewContentGridProps) => {
  const { renderDefault, cards } = props

  const nothingToPreview = !cards || cards.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No cards added yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Box padding={2} style={{ overflowX: 'scroll' }}>
        <Flex gap={2}>
          {cards.map((card) => {
            const cardBodyString = blockPreview(card.body)
            return (
              <Card
                key={card.heading}
                padding={2}
                style={{ minWidth: '175px', width: '175px' }}
                border
              >
                <Stack space={3}>
                  {card.heading && (
                    <Text size={1} weight="medium" >
                      {card.heading}
                    </Text>
                  )}
                  {cardBodyString && <Text size={1} muted>{cardBodyString}</Text>}
                </Stack>
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
