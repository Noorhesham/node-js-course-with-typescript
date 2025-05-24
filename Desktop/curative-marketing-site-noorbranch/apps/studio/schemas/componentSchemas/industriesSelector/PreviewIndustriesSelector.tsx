import { studioApiVersion } from '@/lib/api'
import { Badge, Box, Card, Flex, Stack, Text, useTheme } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'
import { toTitleCase } from '@/utils/strings'

interface Props extends PreviewProps {
  industries?: {
    label?: string
  }[]
}

export const PreviewIndustriesSelector = (props: Props) => {
  const { renderDefault, industries } = props
  const theme = useTheme()

  const nothingToPreview = !industries || industries.length === 0

  if (nothingToPreview) {
    return renderDefault(props)
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            title: 'Industries Selector',
            subtitle: industries?.length ? `${industries.length} industries` : 'No industries'
          })}
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
            {industries.map((industry, index) => (
              <Card key={index} padding={3} border>
                <Text size={1}>{industry.label}</Text>
              </Card>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
