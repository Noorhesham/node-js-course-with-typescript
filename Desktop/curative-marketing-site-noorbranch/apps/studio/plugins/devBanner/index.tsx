import React from 'react'
import { Card, Text, Stack, Box, Container, Flex } from '@sanity/ui'
import { WarningOutlineIcon } from '@sanity/icons'

const DevBanner = () => (
  <Card 
    tone="caution" 
  >
    <Box padding={3}>
      <Container>
        <Flex justify="center" align="center">
          <Stack space={3} align="center">
            <Stack space={2} align="center" direction="row">
              <Text weight="medium" style={{ marginBottom: 2 }} size={1}>
                Development Environment
              </Text>
              <Text muted size={1}>
              Changes made here will not affect production.
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  </Card>
)

export const devBanner = () => {
  return {
    name: 'dev-banner',
    studio: {
      components: {
        layout: (props) => {
          return (
            <>
              <DevBanner />
              {props.renderDefault(props)}
            </>
          )
        }
      }
    }
  }
}
