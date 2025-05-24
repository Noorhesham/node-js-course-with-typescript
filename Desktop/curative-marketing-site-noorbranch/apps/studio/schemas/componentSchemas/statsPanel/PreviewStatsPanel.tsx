import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewStatsPanelProps extends PreviewProps {
  stats?: {
    value?: string
    description?: TypedObject[]
  }[]
}

export const PreviewStatsPanel = (props: PreviewStatsPanelProps) => {
  const { renderDefault, stats } = props

  if (!stats || stats?.length === 0) {
    return renderDefault({ ...props, subtitle: 'No stats provided yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

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
      {stats.length > 0 && (
        <div style={{ overflowX: 'scroll' }}>
          <Flex margin={2} marginTop={2} dir="row" gap={2}>
            {stats.map((stat, index) => {
              const shouldShowCard = stat.value || stat.description

              if (!shouldShowCard) {
                return undefined
              }

              const descriptionString = blockPreview(stat.description)
              return (
                <Card
                  key={stat.value}
                  padding={3}
                  style={{
                    width: '150px',
                    minWidth: '150px',
                    flexShrink: 0,
                  }}
                  border
                >
                  <Stack space={2}>
                    <Text size={2} weight="medium">
                      {stat.value}
                    </Text>
                    <Text size={1}>{descriptionString}</Text>
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </div>
      )}
    </Box>
  )
}
