import { Code, Flex, Text } from '@sanity/ui'
import { FiAnchor } from 'react-icons/fi'
import type { PreviewProps } from 'sanity'

interface PreviewAnchorProps extends PreviewProps {
  anchorId: string
}

export const PreviewAnchor = (props: PreviewAnchorProps) => {
  const { anchorId } = props

  return (
    <Flex align="center" justify="space-between" padding={2}>
      <Flex align="center" gap={2}>
        <FiAnchor />
        <Code size={1} weight="bold">
          {anchorId}
        </Code>
      </Flex>
      <Text size={1} muted>
        Anchor
      </Text>
    </Flex>
  )
}
