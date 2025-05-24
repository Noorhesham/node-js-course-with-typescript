import { Badge, Box, Card, Flex, Stack, Text, useTheme } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import { imageBuilder } from '@/utils/client'

import type { PreviewProps } from 'sanity'

interface Brand {
  title?: string
  logo?: {
    asset: { _ref: string }
  }
}

interface PreviewBrandSwitcherProps extends PreviewProps {
  heading?: string
  subhead?: string
  brands?: Brand[]
}

export const PreviewBrandSwitcher = (props: PreviewBrandSwitcherProps) => {
  const { renderDefault, heading, subhead, brands } = props
  const theme = useTheme()

  const nothingToPreview = !heading && !brands

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No content added' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            subtitle: brands?.length ? `${brands.length} brands` : 'No brands'
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
            {brands?.map((brand, index) => (
              <Card key={brand.title || `brand-${index}`} padding={3} border>
                <Stack space={3} align="center">
                  {brand.logo && (
                    <Box style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={imageBuilder.image(brand.logo.asset._ref).url()}
                        alt={brand.title || 'Brand logo'}
                        style={{ 
                          height: '100%',
                          width: 'auto',
                          maxWidth: '80px',
                          filter: theme.sanity.color.dark ? 'brightness(0) invert(1)' : 'brightness(0)',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  )}
                  <Text size={1}>{brand.title}</Text>
                </Stack>
              </Card>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
