import { Box, Card, Flex, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewWindowPaneProps extends PreviewProps {
  panes: {
    heading: string
  }[]
}

export const PreviewWindowPane = (props: PreviewWindowPaneProps) => {
  const { renderDefault, panes } = props

  const nothingToPreview = !panes || panes.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No panes added yet' })
  }

  return (
    <Box>
      {renderDefault(props)}
      <Box margin={3} marginTop={0} padding={3} style={{ overflowX: 'scroll' }}>
        <Flex gap={4}>
          {panes.map((pane) => {
            return (
              <Card
                key={pane.heading}
                padding={4}
                style={{ minWidth: '175px', width: '175px' }}
                border
              >
                <Flex direction="column" gap={4}>
                  {pane.heading && (
                    <Text size={2} weight="bold">
                      {pane.heading}
                    </Text>
                  )}
                </Flex>
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
