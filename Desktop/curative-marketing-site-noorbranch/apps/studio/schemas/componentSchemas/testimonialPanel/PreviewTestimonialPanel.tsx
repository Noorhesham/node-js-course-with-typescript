import { studioApiVersion } from '@/lib'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import {
  type PreviewProps,
  type SanityClient,
  type TypedObject,
  useClient,
} from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewTestimonialPanelProps extends PreviewProps {
  heading?: TypedObject[]
  subheading?: string
  testimonials?: {
    _ref: string
  }[]
}

type TestimonialPayload = {
  body?: TypedObject[]
  author?: {
    _ref: string
  }
  attributionDetails?: string
}

type TestimonialWithAuthorName = TestimonialPayload & {
  attribution?: string
}

const fetchAuthorName = async (
  client: SanityClient,
  authorRef: string | undefined,
) => {
  if (!authorRef) return undefined

  const author = await client.fetch('*[_id == $authorRef][0]', {
    authorRef,
  })

  if (!author) return undefined

  return [author.firstName, author.lastName].filter(Boolean).join(' ')
}

const fetchTestimonialPayloads = async (
  client: SanityClient,
  testimonialRefs: string[],
  setter: (payload: (TestimonialWithAuthorName | undefined)[]) => void,
) => {
  const testimonialPayloads = await Promise.all(
    testimonialRefs.map(async (ref) => {
      const testimonial = await client.fetch<TestimonialPayload>(
        '*[_id == $ref][0]',
        {
          ref,
        },
      )

      if (!testimonial) return undefined

      if (testimonial.attributionDetails) {
        return { ...testimonial, attribution: testimonial.attributionDetails }
      }

      const authorName = await fetchAuthorName(client, testimonial.author?._ref)

      return { ...testimonial, attribution: authorName }
    }),
  )

  if (!testimonialPayloads) return undefined

  setter(testimonialPayloads)
}

export const PreviewTestimonialPanel = (
  props: PreviewTestimonialPanelProps,
) => {
  const [testimonialPayloads, setTestimonialPayloads] = useState<
    (TestimonialWithAuthorName | undefined)[]
  >([])
  const { renderDefault, heading, subheading, testimonials } = props
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const testimonialRefs = testimonials?.map((testimonial) => testimonial._ref)

    if (!testimonialRefs) return undefined

    fetchTestimonialPayloads(client, testimonialRefs, setTestimonialPayloads)
  }, [client, testimonials])

  const nothingToPreview = !heading && !subheading && !testimonials

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No content added yet' })
  }

  const headingString = blockPreview(heading)

  return (
    <Box>
      {renderDefault(props)}
      <Card padding={4} margin={3} marginTop={0} border>
        <Stack space={3}>
          {headingString && (
            <Text size={1} weight="bold">
              {headingString}
            </Text>
          )}
          {subheading && (
            <Text size={1} muted>
              {subheading}
            </Text>
          )}
          {testimonialPayloads && (
            <Box
              paddingTop={3}
              paddingBottom={4}
              style={{ overflowX: 'scroll' }}
            >
              <Flex direction="row" gap={4}>
                {testimonialPayloads?.map((testimonial) => {
                  if (!testimonial) return undefined

                  const bodyString = blockPreview(testimonial.body)

                  return (
                    <Card
                      key={bodyString}
                      padding={4}
                      border
                      style={{ width: '150px', minWidth: '225px' }}
                    >
                      <Stack space={3}>
                        {bodyString && (
                          <Text
                            size={1}
                            weight="medium"
                            style={{
                              paddingTop: '7px',
                              // Limit to 3 lines of text
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {bodyString}
                          </Text>
                        )}
                        {testimonial.attribution && (
                          <Text size={1} muted>
                            {testimonial.attribution}
                          </Text>
                        )}
                      </Stack>
                    </Card>
                  )
                })}
              </Flex>
            </Box>
          )}
        </Stack>
      </Card>
    </Box>
  )
}
