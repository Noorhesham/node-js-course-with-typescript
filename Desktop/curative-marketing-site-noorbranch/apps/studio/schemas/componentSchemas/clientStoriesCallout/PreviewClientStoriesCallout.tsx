import { PreviewProps } from 'sanity'
import { Box } from '@sanity/ui'

type PreviewClientStoriesCalloutProps = PreviewProps

export const PreviewClientStoriesCallout = (
  props: PreviewClientStoriesCalloutProps,
) => {
  const { renderDefault } = props
  return <Box>{renderDefault({ ...props })}</Box>
}
