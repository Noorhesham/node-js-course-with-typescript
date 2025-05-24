import type { StringInputProps } from 'sanity'
import { Card, Heading, Stack, Text, useTheme_v2 } from '@sanity/ui'
import { namedColors } from '@/lib'

type CalloutUIOptions = StringInputProps['schemaType']['options'] & {
  heading?: string
  body?: string
}

export const CalloutUiForm = (props: StringInputProps) => {
  const { options = {} } = props.schemaType
  const { heading, body } = options as CalloutUIOptions
  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark

  const backgroundColor =
    namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.bg
  const borderColor =
    namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.border

  return (
    <Card
      paddingX={4}
      paddingY={5}
      border
      style={{
        backgroundColor,
        borderColor,
      }}
    >
      <Stack space={4}>
        {heading && <Heading size={1}>{heading}</Heading>}
        {body && <Text size={1}>{body}</Text>}
      </Stack>
    </Card>
  )
}
