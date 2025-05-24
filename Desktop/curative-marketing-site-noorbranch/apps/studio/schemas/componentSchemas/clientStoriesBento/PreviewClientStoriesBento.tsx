import { studioApiVersion } from '@/lib'
import { Badge, Box, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'
import { type PreviewProps, type SanityClient, useClient } from 'sanity'

interface PreviewClientStoriesBentoProps extends PreviewProps {
  clientStories?: Array<{
    clientStory: {
      _ref: string
    }
  }>
}

type ClientStoryPayload = {
  title?: string
  mainImage?: {
    _type: 'image'
    asset: {
      _ref: string
    }
  }
}

const fetchClientStoryDetails = async (
  client: SanityClient,
  storyRefs: string[],
  setter: (payload: (ClientStoryPayload | undefined)[]) => void,
) => {
  const storyPayloads = await Promise.all(
    storyRefs.map(async (ref) => {
      const story = await client.fetch<ClientStoryPayload>(
        `*[_id == $ref][0]{
          title,
          mainImage
        }`,
        { ref }
      )

      if (!story) return undefined
      return story
    })
  )

  if (!storyPayloads) return undefined
  setter(storyPayloads)
}

export const PreviewClientStoriesBento = (props: PreviewClientStoriesBentoProps) => {
  const [storyPayloads, setStoryPayloads] = useState<(ClientStoryPayload | undefined)[]>([])
  const { renderDefault, clientStories } = props
  const client = useClient({ apiVersion: studioApiVersion })

  useEffect(() => {
    const storyRefs = clientStories?.map((item) => item?.clientStory?._ref)
    if (!storyRefs) return undefined

    fetchClientStoryDetails(client, storyRefs, setStoryPayloads)
  }, [client, clientStories])

  const nothingToPreview = !clientStories || clientStories.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No client stories added yet' })
  }

  const builder = imageUrlBuilder(client)
  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={2} paddingRight={3}>
        <Box flex={1}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={2}>
        {storyPayloads && (
          <Box>
            <Grid
              columns={2}
              gap={2}
            >
              {storyPayloads?.map((story, index) => {
                if (!story) return undefined

                const isLastItemOdd = index === storyPayloads.length - 1 && storyPayloads.length % 2 === 1

                return (
                  <Card
                    key={story.title}
                    padding={3}
                    border
                    style={isLastItemOdd ? { gridColumn: '1 / -1' } : undefined}
                  >
                    <Stack space={3}>
                      {story.mainImage?.asset?._ref && (
                        <Box style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                          <img
                            src={builder
                              .image(story.mainImage.asset._ref)
                              .width(600)
                              .height(338)
                              .url()}
                            alt={story.title || ''}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      )}
                      {story.title && (
                        <Box>
                          <Text size={1} weight="medium">
                            {story.title}
                          </Text>
                        </Box>
                      )}
                    </Stack>
                  </Card>
                )
              })}
            </Grid>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
