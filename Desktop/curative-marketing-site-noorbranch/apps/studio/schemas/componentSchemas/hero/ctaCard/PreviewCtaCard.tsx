import { ChevronRightIcon } from '@sanity/icons'
import { Box, Card, Flex, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface PreviewCtaCardProps extends PreviewProps {
  leadInText: string
  ctaText: string
  externalLink: {
    url: string
  }
  internalLink: {
    reference: {
      _ref: string
    }
  }
}

export const PreviewCtaCard = (props: PreviewCtaCardProps) => {
  const { renderDefault, leadInText, ctaText, externalLink, internalLink } =
    props

  if (
    !leadInText ||
    !ctaText ||
    externalLink?.url ||
    internalLink?.reference?._ref
  ) {
    return renderDefault({ ...props, subtitle: 'No CTA Card details provided' })
  }

  return (
    <Box>
      {renderDefault(props)}
      <Card margin={3} marginTop={2} padding={3} border>
        <Flex align="center" justify="space-between">
          {leadInText && (
            <Text size={1} muted>
              {leadInText}
            </Text>
          )}
          {ctaText && (
            <Flex align="center">
              <Text size={1} weight="semibold">
                {ctaText}
              </Text>
              <ChevronRightIcon width={24} height={24} />
            </Flex>
          )}
        </Flex>
      </Card>
    </Box>
  )
}
