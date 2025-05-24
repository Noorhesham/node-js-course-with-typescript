import { Badge, Box, Card, Flex, Stack, Text, useTheme } from '@sanity/ui'
import { type PreviewProps } from 'sanity'
import { toTitleCase } from '@/utils/strings'

interface Props extends PreviewProps {
  theme?: string
  tabs?: {
    heading?: string
  }[]
}

export const PreviewSectionTab = (props: Props) => {
  const { renderDefault, theme, tabs } = props
  const uiTheme = useTheme()

  const nothingToPreview = !tabs || tabs.length === 0

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
            title: theme ? `${toTitleCase(theme)} Section Tab` : 'Section Tab',
            subtitle: tabs?.length ? `${tabs.length} sections` : 'No sections'
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
            {tabs.map((tab, index) => (
              <Card key={index} padding={3} border>
                <Text size={1}>{tab.heading || `Section ${index + 1}`}</Text>
              </Card>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
