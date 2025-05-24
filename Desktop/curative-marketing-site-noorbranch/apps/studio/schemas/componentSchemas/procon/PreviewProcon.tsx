import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'
import { toTitleCase } from '@/utils/strings'

interface PreviewProconProps extends PreviewProps {
  internalName?: string
  rows?: Array<{
    pro?: string
    con?: string
  }>
  schemaType?: {
    name: string
  }
  renderDefault?: (props: PreviewProps) => React.ReactElement
}

export const PreviewProcon = (props: PreviewProconProps) => {
  const { internalName, rows = [], renderDefault, schemaType } = props
  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType
  const title = internalName || 'ProCon Table'

  const truncateArray = <T extends { pro?: string; con?: string }>(arr: T[] | undefined | null, maxItems: number = 3) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return []
    if (arr.length <= maxItems) return arr
    return [...arr.slice(0, maxItems), { pro: `+${arr.length - maxItems} more...`, con: `+${arr.length - maxItems} more...` }]
  }

  const renderContent = () => (
    <Flex padding={2} gap={3}>
      {/* Pros Side */}
      <Card padding={3} border radius={2} flex={1}>
        <Stack space={3}>
          <Text size={1} weight="medium">Pros</Text>
          <Stack space={2}>
            {truncateArray(rows).map((row, index) => (
              <Text key={index} size={1} muted={row.pro && row.pro.includes('more')}>
                {row.pro && !row.pro.includes('more') ? `• ${row.pro}` : row.pro || ''}
              </Text>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Cons Side */}
      <Card padding={3} border radius={2} flex={1}>
        <Stack space={3}>
          <Text size={1} weight="medium">Cons</Text>
          <Stack space={2}>
            {truncateArray(rows).map((row, index) => (
              <Text key={index} size={1} muted={row.con && row.con.includes('more')}>
                {row.con && !row.con.includes('more') ? `• ${row.con}` : row.con || ''}
              </Text>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Flex>
  )

  return (
    <Card padding={0} radius={2} shadow={1}>
      <Stack>
        <Card padding={2} tone="default" radius={0}>
          <Flex gap={2} align="center">
            <Box>
              <Badge tone="primary" fontSize={0} padding={1}>
                {toTitleCase(componentName || '')}
              </Badge>
            </Box>
            <Text size={1} weight="semibold">
              {title}
            </Text>
          </Flex>
        </Card>
        {renderContent()}
      </Stack>
    </Card>
  )
}
