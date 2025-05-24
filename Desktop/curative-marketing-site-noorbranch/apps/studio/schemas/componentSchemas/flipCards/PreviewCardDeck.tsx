import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewCardDeckProps extends PreviewProps {
  cards: {
    front: {
      heading: string
      body: TypedObject[]
    }
    back: {
      heading: string
      body: TypedObject[]
    }
  }[]
}

export const PreviewCardDeck = (props: PreviewCardDeckProps) => {
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
          {cards.map((card, index) => {
            const frontBodyString = card.front?.body ? blockPreview(card.front.body) : ''
            const backBodyString = card.back?.body ? blockPreview(card.back.body) : ''
            
            return (
              <Card
                key={index}
                padding={2}
                style={{ minWidth: '175px', width: '175px' }}
                border
              >
                <Stack space={3}>
                  <Stack space={2}>
                    <Box style={{ textAlign: 'right' }}>
                      <Box style={{ display: 'inline-block' }}>
                        <Badge size={1}>Front</Badge>
                      </Box>
                    </Box>
                    {card.front?.heading && (
                      <Text size={1} weight="medium">
                        {card.front.heading}
                      </Text>
                    )}
                    {frontBodyString && <Text size={1} muted>{frontBodyString}</Text>}
                  </Stack>
                  <Box style={{ height: '1px' }} marginY={2}>
                    <Card tone="transparent" border />
                  </Box>
                  <Stack space={2}>
                    <Box style={{ textAlign: 'right' }}>
                      <Box style={{ display: 'inline-block' }}>
                        <Badge size={1}>Back</Badge>
                      </Box>
                    </Box>
                    {card.back?.heading && (
                      <Text size={1} weight="medium">
                        {card.back.heading}
                      </Text>
                    )}
                    {backBodyString && <Text size={1} muted>{backBodyString}</Text>}
                  </Stack>
                </Stack>
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
