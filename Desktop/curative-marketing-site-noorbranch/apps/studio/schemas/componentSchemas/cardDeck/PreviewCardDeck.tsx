import { Box, Card, Flex, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewCardDeckProps extends PreviewProps {
  cards: {
    heading: string
    body: TypedObject[]
    cta: {
      actionType: string
      buttonText: string
    }
  }[]
}

export const PreviewCardDeck = (props: PreviewCardDeckProps) => {
  const { renderDefault, cards } = props

  const nothingToPreview = !cards || cards.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No cards added yet' })
  }

  return (
    <Box>
      {renderDefault(props)}
      <Box margin={3} marginTop={0} padding={3} style={{ overflowX: 'scroll' }}>
        <Flex gap={4}>
          {cards.map((card) => {
            const cardBodyString = blockPreview(card.body)
            const ctaButtonText =
              card.cta?.buttonText && card.cta.actionType
                ? card.cta.buttonText
                : undefined
            return (
              <Card
                key={card.heading}
                padding={4}
                style={{ minWidth: '175px', width: '175px' }}
                border
              >
                <Flex direction="column" gap={4}>
                  {card.heading && (
                    <Text size={2} weight="bold">
                      {card.heading}
                    </Text>
                  )}
                  {cardBodyString && <Text size={1}>{cardBodyString}</Text>}
                  {ctaButtonText && (
                    <Text size={1} weight="bold">
                      {ctaButtonText}
                    </Text>
                  )}
                </Flex>
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
