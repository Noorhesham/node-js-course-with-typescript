import { studioApiVersion } from '@/lib'
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import { useEffect, useState } from 'react'
import {
  type PreviewProps,
  type SanityClient,
  type TypedObject,
  useClient,
} from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewTestimonialBlockProps extends PreviewProps {
  internalName?: string
  testimonial?: {
    _ref: string
  }
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
  testimonialRef: string,
  setter: (payload: TestimonialWithAuthorName | undefined) => void,
) => {
  const testimonial = await client.fetch<TestimonialPayload>(
    '*[_id == $ref][0]',
    { ref: testimonialRef },
  )
  if (!testimonial) {
    setter(undefined)
    return
  }
  let attribution = testimonial.attributionDetails
  if (!attribution) {
    attribution = await fetchAuthorName(client, testimonial.author?._ref)
  }
  setter({ ...testimonial, attribution })
}

export const PreviewTestimonialBlock = (
  props: PreviewTestimonialBlockProps,
) => {
  const [testimonialPayload, setTestimonialPayload] = useState<
    TestimonialWithAuthorName | undefined
  >()
  const { renderDefault, internalName, testimonial } = props
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const testimonialRef = testimonial?._ref

    if (!testimonialRef) return undefined

    fetchTestimonialPayloads(client, testimonialRef, setTestimonialPayload)
  }, [client, testimonial?._ref])

  const nothingToPreview = !internalName && !testimonial

  if (nothingToPreview) {
    return renderDefault(props)
  }

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            title: internalName || 'Testimonial Block'
          })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={2}>
        <Card padding={3} border radius={2}>
          <Stack space={4}>
            {testimonialPayload?.body ? (
              <Text size={1} style={{ fontStyle: 'italic' }}>
                {blockPreview(testimonialPayload.body)}
              </Text>
            ) : (
              <Text size={1} muted>
                Loading testimonial content...
              </Text>
            )}
            {testimonialPayload?.attribution && (
              <Box style={{ textAlign: 'right' }}>
                <Text size={1} weight="semibold">
                  {testimonialPayload.attribution}
                </Text>
                {testimonialPayload.attributionDetails && (
                  <Text size={1} muted>
                    {testimonialPayload.attributionDetails}
                  </Text>
                )}
              </Box>
            )}
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
