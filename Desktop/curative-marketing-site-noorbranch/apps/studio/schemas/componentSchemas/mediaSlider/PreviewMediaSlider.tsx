import { studioApiVersion } from '@/lib/api'
import { Badge, Box, Card, Flex, Stack } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient, type SanityImageAsset } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

interface PreviewMediaSliderProps extends PreviewProps {
  mediaList?: Array<{
    _key: string
    _type: 'media'
    image: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    title: string
  }>
}

export const PreviewMediaSlider = (props: PreviewMediaSliderProps) => {
  const { renderDefault, mediaList = [] } = props
  const client = useClient({ apiVersion: studioApiVersion })
  const builder = imageUrlBuilder(client)

  if (!mediaList || mediaList.length === 0) {
    return renderDefault({
      ...props,
      title: 'No media items added yet'
    })
  }

  return (
    <Box>
      <Flex align="center" paddingBottom={0} gap={2} paddingRight={3}>
        <Box flex={1} paddingBottom={0}>
          {renderDefault(props)}
        </Box>
        {props.schemaType && (
          <Badge mode="outline">
            {toTitleCase(typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType)}
          </Badge>
        )}
      </Flex>
      <Box paddingBottom={0} style={{ overflowX: 'scroll' }}>
        <Flex paddingLeft={2} paddingRight={2} gap={2}>
          {mediaList.map((item) => {
            if (!item?.image?.asset?._ref) return null

            return (
              <Card
                key={item._key}
                marginTop={2}
                padding={2}
                border
                style={{
                  minWidth: '133px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <Box style={{ flex: 1, position: 'relative' }}>
                  <img
                    src={builder.image(item.image.asset._ref).width(266).height(200).url()}
                    alt={item.title || ''}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                {item.title && (
                  <Box style={{ fontSize: '11px', lineHeight: '13px' }}>
                    {item.title}
                  </Box>
                )}
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
