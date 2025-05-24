import { studioApiVersion } from '@/lib/api'
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import type { PreviewProps } from 'sanity'
import { imageBuilder } from '@/utils/client'
import { toTitleCase } from '@/utils/strings'
import { GoColumns } from 'react-icons/go'

interface PreviewSwitchbackProps extends PreviewProps {
  heading?: string
  body?: string
  eyebrow?: string
  mediaSide?: 'left' | 'right'
  image?: {
    asset?: {
      _ref?: string
    }
  }
}

export const PreviewSwitchback = (props: PreviewSwitchbackProps) => {
  const { heading, body, eyebrow, mediaSide = 'right', image, renderDefault, schemaType } = props

  // Get component name from schema type
  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  const imageUrl = image?.asset?._ref
    ? imageBuilder
        .image(image.asset._ref)
        .width(210)
        .height(140)
        .fit('crop')
        .url()
    : null

  const renderContent = () => (
    <Stack space={2} padding={2}>
      {eyebrow && (
        <Text size={0} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {eyebrow}
        </Text>
      )}
      <Text size={1} weight="medium">
        {heading || 'No heading added'}
      </Text>
      {body && (
        <Text size={1} muted>
          {typeof body === 'string' ? truncateText(body, 90) : 'Complex body content...'}
        </Text>
      )}
    </Stack>
  )

  const ImageSection = () => (
    <Box style={{ width: '50%', minWidth: '50%', position: 'relative' }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={heading || 'Switchback image'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
          }}
        >
          <Text muted>No image</Text>
        </Flex>
      )}
    </Box>
  )

  return (
    <Box>
      <Flex align="center" paddingBottom={0} gap={2} paddingRight={2}>
        <Box flex={1} paddingBottom={0}>
          {renderDefault?.({ ...props, title: toTitleCase(componentName || '') })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={2}>
      <Card padding={2} border radius={2} overflow="hidden">
        <Flex style={{ height: '140px' }}>
          {mediaSide === 'left' ? (
            <>
              <ImageSection />
              <Box style={{ width: '50%' }}>
                {renderContent()}
              </Box>
            </>
          ) : (
            <>
              <Box style={{ width: '50%' }}>
                {renderContent()}
              </Box>
              <ImageSection />
            </>
          )}
        </Flex>
      </Card>
      </Stack>
    </Box>
  )
}
