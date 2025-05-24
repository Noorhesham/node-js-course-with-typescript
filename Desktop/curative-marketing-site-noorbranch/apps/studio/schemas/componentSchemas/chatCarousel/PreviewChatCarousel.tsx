import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewChatCarouselProps extends PreviewProps {
  sliders?: Array<{
    clientQuestion?: TypedObject[]
    webstacksAnswers?: Array<{
      answer?: TypedObject[]
      theme?: 'red' | 'green'
    }>
  }>
}

export const PreviewChatCarousel = (props: PreviewChatCarouselProps) => {
  const { renderDefault, sliders } = props

  const nothingToPreview = !sliders || sliders.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No chat items added yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  const renderChatItem = (slider: PreviewChatCarouselProps['sliders'][0], index: number) => {
    const question = slider.clientQuestion ? blockPreview(slider.clientQuestion) : ''
    const firstAnswer = slider.webstacksAnswers?.[0]?.answer ? blockPreview(slider.webstacksAnswers[0].answer) : ''
    
    return (
      <Card key={index} padding={2} border radius={2} marginBottom={2}>
        <Stack space={3}>
          <Stack space={3}>
            <Box>
              <Badge marginBottom={3} size={1}>Question</Badge>
              <Text size={1} muted marginLeft={2}>
                {question || 'No question'}
              </Text>
            </Box>
            <Box style={{ height: '1px' }}>
              <Card tone="transparent" border />
            </Box>
            {firstAnswer && (
              <Box>
              <Badge marginBottom={3} size={1}>Answer</Badge>
              <Text size={1} muted marginLeft={2}>
                  {firstAnswer}
                </Text>
              </Box>
            )}
          </Stack>
        </Stack>
      </Card>
    )
  }

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Box padding={2}>
        <Stack space={2}>
          {sliders.length > 0 && renderChatItem(sliders[0], 0)}
          {sliders.length > 1 && (
            <Box style={{ textAlign: 'center' }}>
              <Text size={1} muted>+{sliders.length - 1} more conversations</Text>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
