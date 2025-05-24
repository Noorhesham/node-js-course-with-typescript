import { PreviewProps } from 'sanity'
import { Box } from '@sanity/ui'

export const PreviewClientStoriesWall = (props: PreviewProps) => {
  const { renderDefault } = props
  return <Box>{renderDefault({ ...props })}</Box>
}
