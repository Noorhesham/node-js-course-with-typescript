import React from 'react'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'

export function PreviewWebstacksDevPost(props: any) {
  const { title, publishDate, excerpt, featuredImage } = props.value || {}
  
  return (
    <Card padding={3}>
      <Flex gap={3}>
        {featuredImage?.image && (
          <Box style={{ flexShrink: 0, width: '100px', height: '100px', overflow: 'hidden' }}>
            <img 
              src={featuredImage.image.asset?.url} 
              alt={featuredImage.alt || title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        <Stack space={3} style={{ flex: 1 }}>
          <Text weight="semibold" size={2}>{title || 'Untitled Dev Blog Post'}</Text>
          {publishDate && (
            <Text size={1} muted>
              {new Date(publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          )}
          {excerpt && (
            <Text size={1} style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {excerpt}
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}
