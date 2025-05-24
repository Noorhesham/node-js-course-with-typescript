import { studioApiVersion } from '@/lib'
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient, type SanityImageAsset } from 'sanity'
import { blockPreview } from 'sanity-pills'
import imageUrlBuilder from '@sanity/image-url'

interface PreviewCardCarouselProps extends PreviewProps {
  cards?: Array<{
    featuredImage?: {
      _type: 'image'
      asset: {
        _ref: string
      }
    }
    heading?: string
    body?: any[]
  }>
}

export const PreviewCardCarousel = (props: PreviewCardCarouselProps) => {
  const { renderDefault, cards = [] } = props
  const client = useClient({ apiVersion: studioApiVersion })
  const builder = imageUrlBuilder(client)

  const nothingToPreview = !cards || cards.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No cards added yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={2} paddingRight={3}>
        <Box flex={1}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={2}>
        <Box paddingTop={2} paddingBottom={2} style={{ overflowX: 'auto', width: '100%' }}>
          <Flex gap={2} wrap="nowrap" style={{ width: 'max-content' }}>
            {cards.map((card, index) => {
              if (!card) return undefined

              const bodyPreview = card.body ? blockPreview(card.body) : undefined

              return (
                <Card
                  key={`${card.heading}-${index}`}
                  padding={3}
                  border
                  style={{ width: '300px' }}
                >
                  <Stack space={3}>
                    {card.featuredImage?.asset?._ref && (
                      <Box style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={builder
                            .image(card.featuredImage.asset._ref)
                            .width(600)
                            .height(338)
                            .url()}
                          alt={card.heading || ''}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                    {card.heading && (
                      <Box>
                        <Text size={1} weight="medium">
                          {card.heading}
                        </Text>
                      </Box>
                    )}
                    {bodyPreview && (
                      <Box>
                        <Text
                          size={1}
                          muted
                        >
                          {bodyPreview}
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
