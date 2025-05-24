import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { hues } from '@sanity/color'

interface PreviewHeroProps extends PreviewProps {
  heading: TypedObject[]
  rightContentType: string
  bodyLeft: TypedObject[]
  bodyRight: TypedObject[]
  heroLayout: string
}

export const PreviewHero = (props: PreviewHeroProps) => {
  const {
    renderDefault,
    heroLayout,
    heading,
    rightContentType,
    bodyLeft,
    bodyRight,
  } = props

  const nothingToPreview = !heading && !bodyLeft && !bodyRight

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No content added' })
  }

  const headingString = blockPreview(heading)
  const bodyLeftString = blockPreview(bodyLeft)

  return (
    <Box>
      {renderDefault(props)}
      <Card padding={4} margin={3} marginTop={2} border>
        <Flex dir="row" gap={2} align="center">
          {/* Left */}
          <Stack
            flex={heroLayout === 'center' ? 1 : 2 / 3}
            space={2}
            paddingRight={3}
          >
            {headingString && (
              <Text size={1} weight="bold">
                {headingString}
              </Text>
            )}
            {bodyLeftString && (
              <Text size={1} muted>
                {bodyLeftString}
              </Text>
            )}
          </Stack>

          {/* Right */}
          {heroLayout !== 'center' && (
            <Flex
              flex={1 / 3}
              align="center"
              justify="center"
              style={{ borderLeft: '1px solid #ccc' }}
              padding={3}
            >
              {rightContentType === 'media' && (
                <Card
                  border
                  padding={6}
                  style={{ backgroundColor: hues.gray[100].hex }}
                >
                  <Text size={1} muted>
                    Media
                  </Text>
                </Card>
              )}
              {rightContentType === 'body' && (
                <Card
                  border
                  padding={6}
                  style={{ backgroundColor: hues.gray[100].hex }}
                >
                  <Text size={1} muted>
                    ...
                  </Text>
                </Card>
              )}
            </Flex>
          )}
        </Flex>
      </Card>
    </Box>
  )
}
