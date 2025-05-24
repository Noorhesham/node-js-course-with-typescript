import { Box, Card, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface PreviewFeaturedTestimonialProps extends PreviewProps {
  testimonial: unknown
  body: string
  authorFirstName: string
  authorLastName: string
  authorRole: string
  authorCompany: string
  attributionDetails: string
}

export const PreviewFeaturedTestimonial = (
  props: PreviewFeaturedTestimonialProps,
) => {
  const {
    renderDefault,
    testimonial,
    authorFirstName,
    authorLastName,
    authorRole,
    authorCompany,
    attributionDetails,
    body,
  } = props

  if (!testimonial) {
    return (
      <Box>
        {renderDefault({ ...props, title: 'Featured Testimonial' })}
        <Card margin={3} padding={3} border>
          <Text muted>No testimonial selected</Text>
        </Card>
      </Box>
    )
  }

  const authorName = [authorFirstName, authorLastName].filter(Boolean).join(' ')

  const attribution = attributionDetails
    ? attributionDetails
    : `${authorName}, ${authorRole} at ${authorCompany || 'Unkown Company'}`

  return (
    <Box>
      {renderDefault({ ...props, title: 'Featured Testimonial' })}
      <Card margin={3} padding={4} border>
        <Stack space={4}>
          <Text size={2}>{body}</Text>
          <Text muted size={1}>
            {attribution}
          </Text>
        </Stack>
      </Card>
    </Box>
  )
}
