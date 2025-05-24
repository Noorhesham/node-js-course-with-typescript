import { Box, Card, Heading, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface PreviewFeaturedContentProps extends PreviewProps {
  contentTitle?: string
  heading?: string
  description?: string
  linkText?: string
}

export const PreviewFeaturedContent = (props: PreviewFeaturedContentProps) => {
  const { renderDefault, contentTitle, heading, description, linkText } = props
  return (
    <Box>
      {renderDefault({ ...props, title: 'Featured Content' })}
      <Card margin={3} padding={4} border>
        <Stack space={4}>
          {heading ||
            (contentTitle && (
              <Heading size={0}>{heading || contentTitle}</Heading>
            ))}
          {description && <Text size={1}>{description}</Text>}
          {linkText && (
            <Text size={1} weight="semibold">
              {linkText}
            </Text>
          )}
        </Stack>
      </Card>
    </Box>
  )
}
