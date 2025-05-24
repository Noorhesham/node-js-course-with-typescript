import { Badge, Box, Flex } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface SimplifiedPreviewProps extends PreviewProps {
  title?: string
  count?: number
  countLabel?: string
  subtitle?: string
}

/**
 * A simplified preview component that only shows basic information
 * to improve performance in the Studio
 */
import { toTitleCase } from '@/utils/strings'

export const SimplifiedPreview = (props: SimplifiedPreviewProps) => {
  const { renderDefault, title, count, countLabel = 'items', subtitle } = props

  // If we have a count, show it in the subtitle
  const countText = count !== undefined ? `${count} ${countLabel}` : undefined
  
  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType
  
  return (
    <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            title: title || props.title,
            subtitle: subtitle ?? countText,
          })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
    </Flex>
  )
}