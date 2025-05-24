import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewAccordionProps extends PreviewProps {
  items: Array<{
    title?: string
    body?: any[]
  }>
}

export const PreviewAccordion = (props: PreviewAccordionProps) => {
  const { renderDefault, items = [] } = props

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  const subtitle = items?.length
    ? `${items.length} ${items.length === 1 ? 'item' : 'items'}`
    : 'No FAQ items added'

  if (!items || items.length === 0) {
    return (
      <Box>
        {renderDefault({ ...props, subtitle })}
        <Box paddingTop={3}>
          <Card padding={4} radius={2} tone="critical">
            <Text align="center" muted size={1}>
              Add FAQ items to display them here
            </Text>
          </Card>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({ ...props, subtitle })}
        </Box>
        <Badge mode="outline">
          Accordion
        </Badge>
      </Flex>

      <Stack padding={3} space={3}>
        {items.map((item, index) => {
          const answer = item.body ? blockPreview(item.body) : 'No answer provided'

          return (
            <Card key={index} padding={3} radius={2} border>
              <Stack space={3}>
                {/* Question */}
                <Stack space={2}>
                  <Box style={{ width: 'fit-content' }}>
                    <Badge mode="outline">
                      Question
                    </Badge>
                  </Box>
                  <Text size={1}>
                    {item.title ? truncateText(item.title, 100) : 'No question provided'}
                  </Text>
                </Stack>

                {/* Answer Preview */}
                <Stack space={2}>
                  <Box style={{ width: 'fit-content' }}>
                    <Badge mode="outline">
                      Answer
                    </Badge>
                  </Box>
                  <Text size={1} muted>
                    {truncateText(answer, 150)}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </Box>
  )
}
