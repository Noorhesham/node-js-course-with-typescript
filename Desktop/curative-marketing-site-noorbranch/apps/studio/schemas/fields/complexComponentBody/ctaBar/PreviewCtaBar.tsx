import { studioApiVersion } from '@/lib/api'
import { Badge, Box, Flex, Text } from '@sanity/ui'
import { useTheme_v2 } from '@sanity/ui'
import { namedColors } from '@/lib/consts'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient, useFormValue } from 'sanity'

interface PreviewCtaBarProps extends PreviewProps {
  value?: {
    ctas?: Array<{
      _type?: string
      _ref?: string
      buttonText?: string
    }>
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

export const PreviewCtaBar = (props: PreviewCtaBarProps) => {
  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const sharedBorderColor = namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.border
  const { renderDefault, value } = props
  const ctas = value?.ctas || []
  const [ctaTitles, setCtaTitles] = useState<CtaInfo[]>([])
  
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const extractCtaTitles = async () => {
      const titles: CtaInfo[] = []
      for (const cta of ctas) {
        if (cta._type === 'localCta') {
          titles.push({ text: cta.buttonText || 'Untitled CTA', isShared: false })
        } else if (cta._type === 'reference' && cta._ref) {
          const sharedText = await fetchSharedCtaText(client, cta._ref)
          titles.push({ text: sharedText || 'Loading...', isShared: true })
        }
      }
      setCtaTitles(titles)
    }

    if (ctas?.length) {
      extractCtaTitles()
    }
  }, [ctas, client])

  if (!ctas?.length) {
    return renderDefault?.(props) || null
  }

  return (
    <Box padding={2}>
      <Flex direction="column" gap={3}>
        {renderDefault(props)}
        {ctaTitles.length > 0 && (
        <Flex direction="row" gap={2} padding={2} wrap="wrap">
          {ctaTitles.map((cta, index) => (
            <Badge
              key={index}
              padding={2}
              tone={cta.isShared ? undefined : 'default'}
              style={cta.isShared ? {
                backgroundColor: 'transparent',
                border: `1px solid ${sharedBorderColor}`
              } : undefined}
            >
              {cta.isShared ? (
                <span style={{ color: sharedBorderColor }}>{cta.text}</span>
              ) : cta.text}
            </Badge>
          ))}
        </Flex>
        )}
      </Flex>
    </Box>
  )
}
