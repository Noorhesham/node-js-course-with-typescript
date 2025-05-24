import { namedColors, studioApiVersion } from '@/lib'
import { Badge, Card, Flex, useTheme_v2 } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'

export const PreviewReusableContent = (props: PreviewProps) => {
  const [refCount, setRefCount] = useState(0)
  const { renderDefault, _id } = props as PreviewProps & { _id: string }

  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const backgroundColor =
    namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.bg
  const borderColor =
    namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.border
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    if (!_id) return

    const getRefCount = async () => {
      const count = await client.fetch('count(*[references($id)])', {
        id: _id,
      })

      setRefCount(count)
    }

    getRefCount()
  }, [_id, client])

  return (
    <Card
      border
      paddingRight={2}
      style={{
        borderStyle: 'dashed',
        backgroundColor,
        borderColor,
      }}
    >
      <Flex justify="space-between">
        {renderDefault(props)}
        {refCount > 1 && (
          <Flex align="center">
            <Badge
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
              }}
            >
             <span style={{ color: borderColor }}> {refCount} uses</span>
            </Badge>
          </Flex>
        )}
      </Flex>
    </Card>
  )
}
