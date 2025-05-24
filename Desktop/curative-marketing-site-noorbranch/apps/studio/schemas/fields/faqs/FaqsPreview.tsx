import { Box, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

type FaqsPreviewProps = PreviewProps & {
  heading: string
  questions: {
    question?: string
    answer?: TypedObject[]
  }[]
}

export const FaqsPreview = (props: FaqsPreviewProps) => {
  const { heading, questions } = props

  return (
    <Flex direction="column">
      {props.renderDefault({ ...props, title: heading })}
      <Box padding={4}>
        {questions ? (
          <Stack space={4}>
            {questions.map((question) => (
              <Stack key={question.question} space={3}>
                <details>
                  <summary>
                    {question.question
                      ? question.question
                      : 'Enter a question to see it here.'}
                  </summary>
                  <Box marginTop={4}>
                    <Text muted>
                      {question.answer
                        ? blockPreview(question.answer).trim()
                        : 'Enter an answer to see it here.'}
                    </Text>
                  </Box>
                </details>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Text>Add questions to see them here.</Text>
        )}
      </Box>
    </Flex>
  )
}
