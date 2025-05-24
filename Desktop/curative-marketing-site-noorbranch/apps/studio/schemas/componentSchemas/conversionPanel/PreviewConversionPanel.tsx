import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { useClient } from 'sanity'
import { useEffect, useState } from 'react'
import { studioApiVersion } from '@/lib/api'
import { useTheme_v2 } from '@sanity/ui'
import { namedColors } from '@/lib/consts'
import { toTitleCase } from '@/utils/strings'

interface PreviewConversionPanelProps extends PreviewProps {
  heading?: {
    text: TypedObject[]
    headingLevel?: string
    headingSize?: string
    headingWeight?: string
  }
  body?: any[]
  schemaType?: {
    name: string
  }
  renderDefault?: (props: PreviewProps) => React.ReactElement
}

interface CtaInfo {
  text: string
  isShared: boolean
}

const fetchSharedCtaText = async (client: any, ref: string) => {
  const cta = await client.fetch(
    `*[_id == $ref][0]{ buttonText }`,
    { ref }
  )
  return cta?.buttonText
}

const extractCtaTitles = async (client: any, body: any[]) => {
  const ctas: CtaInfo[] = []
  if (!Array.isArray(body)) return ctas

  for (const block of body) {
    if (block._type === 'ctaBar' && block.ctas) {
      for (const cta of block.ctas) {
        if (cta.buttonText) {
          ctas.push({ text: cta.buttonText, isShared: false })
        } else if (cta._ref) {
          const sharedText = await fetchSharedCtaText(client, cta._ref)
          ctas.push({ text: sharedText || 'Loading...', isShared: true })
        }
      }
    }
  }
  return ctas
}

export const PreviewConversionPanel = (props: PreviewConversionPanelProps) => {
  const { heading, body, schemaType, renderDefault } = props
  const [ctaTitles, setCtaTitles] = useState<CtaInfo[]>([])
  const client = useClient({ apiVersion: studioApiVersion })
  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const sharedBorderColor = namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.border
  
  useEffect(() => {
    if (body) {
      extractCtaTitles(client, body).then(setCtaTitles)
    }
  }, [client, body])
  
  if (!heading && !body) {
    return renderDefault?.({ ...props, title: 'Conversion Panel' })
  }

  const renderContent = () => (
    <Stack space={2} padding={2}>
      <Text size={1} weight="medium">
        {heading?.text?.[0]?.children?.[0]?.text || 'No heading added'}
      </Text>
      {Array.isArray(body) && body.map((block, index) => (
        block._type === 'block' && block.children && (
          <Text key={block._key || index} size={1} muted>
            {block.children.map((child: any) => child.text).join('')}
          </Text>
        )
      ))}
      {ctaTitles.length > 0 && (
        <Flex gap={2} wrap="wrap">
          {ctaTitles.map((cta, index) => (
            <Badge padding={2} key={index} tone={cta.isShared ? undefined : 'default'} style={cta.isShared ? {
              backgroundColor: 'transparent',
              border: `1px solid ${sharedBorderColor}`
            } : undefined}>
              {cta.isShared ? (
                <span style={{ color: sharedBorderColor }}>{cta.text}</span>
              ) : cta.text}
            </Badge>
          ))}
        </Flex>
      )}
    </Stack>
  )

  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType

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
        <Card padding={2} border radius={2}>
          {renderContent()}
        </Card>
      </Stack>
    </Box>
  )
}

