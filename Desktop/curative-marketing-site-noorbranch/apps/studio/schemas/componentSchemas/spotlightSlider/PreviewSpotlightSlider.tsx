import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'
import { imageBuilder } from '@/utils/client'
import { GoDeviceCameraVideo } from 'react-icons/go'

interface PreviewSpotlightSliderProps extends PreviewProps {
  internalName?: string
  sliders?: Array<{
    heading?: string
    subhead?: any[]
    image?: {
      asset?: {
        _ref?: string
      }
    }
  }>
}

export const PreviewSpotlightSlider = (props: PreviewSpotlightSliderProps) => {
  const { internalName, sliders = [], renderDefault } = props

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  return (
    <Box>
      {/* Header */}
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            title: 'Spotlight Slider',
            subtitle: `${sliders.length} ${sliders.length === 1 ? 'Slide' : 'Slides'}`,
            media: GoDeviceCameraVideo
          })}
        </Box>
        <Badge mode="outline">
          Spotlight Slider
        </Badge>
      </Flex>

      {/* Slides Preview */}
      <Stack padding={2} space={2}>
        <Box paddingTop={2} paddingBottom={2} style={{ overflowX: 'auto', width: '100%' }}>
          <Flex gap={2} wrap="nowrap" style={{ width: 'max-content' }}>
            {sliders.map((slide, index) => {
              const imageUrl = slide.image?.asset?._ref
                ? imageBuilder
                    .image(slide.image.asset._ref)
                    .width(180)
                    .height(120)
                    .fit('crop')
                    .url()
                : null

              return (
                <Card key={index} padding={2} radius={2} border style={{ width: '180px' }}>
                  <Stack space={2}>
                    {/* Image */}
                    {imageUrl ? (
                      <Box style={{ position: 'relative', paddingBottom: '66.67%' }}>
                        <img
                          src={imageUrl}
                          alt={slide.heading || 'Slide image'}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                    ) : (
                      <Box 
                        style={{ 
                          paddingBottom: '66.67%',
                          background: '#eee',
                          borderRadius: '4px',
                          position: 'relative'
                        }}
                      >
                        <Flex 
                          align="center" 
                          justify="center" 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                        >
                          <Text size={1} muted>No image</Text>
                        </Flex>
                      </Box>
                    )}

                    {/* Content */}
                    <Stack space={2}>
                      <Text size={1} weight="medium">
                        {slide.heading ? truncateText(slide.heading, 40) : 'No heading'}
                      </Text>
                      {slide.subhead && (
                        <Text size={0} muted>
                          {truncateText(slide.subhead[0]?.children?.[0]?.text || '', 60)}
                        </Text>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
