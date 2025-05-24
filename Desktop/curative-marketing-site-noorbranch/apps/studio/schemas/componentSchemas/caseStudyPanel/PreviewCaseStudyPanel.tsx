import { studioApiVersion } from '@/lib/api'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewcaseStudyPanelProps extends PreviewProps {
  heading: string
  subheading: string
  caseStudies: {
    caseStudy: {
      _ref: string
    }
  }[]
}

export const PreviewCaseStudyPanel = (props: PreviewcaseStudyPanelProps) => {
  const [caseStudyTitles, setCaseStudyTitles] = useState<string[]>([])
  const { renderDefault, heading, subheading, caseStudies } = props
  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const getCaseStudyTitles = async (
      caseStudies: {
        caseStudy: { _ref: string }
      }[],
    ) => {
      const caseStudyTitles = await client.fetch(
        '*[_id in $caseStudyIds].title',
        {
          caseStudyIds: caseStudies.map((entry) => entry.caseStudy._ref),
        },
      )

      setCaseStudyTitles(caseStudyTitles)
    }

    getCaseStudyTitles(caseStudies)
  }, [caseStudies, client])

  if (!caseStudies) {
    return renderDefault({ ...props, subtitle: 'No case studies added' })
  }

  const headingString = blockPreview(heading)

  return (
    <Box>
      {renderDefault(props)}
      <Box margin={3} marginTop={2}>
        <Stack space={2}>
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
          {caseStudyTitles?.length > 0 && (
            <div style={{ overflowX: 'scroll' }}>
              <Flex dir="row" gap={2}>
                {caseStudyTitles.map((title) => (
                  <Card
                    key={`card-${title}`}
                    padding={3}
                    marginBottom={2}
                    border
                    flex={0}
                    style={{
                      minWidth: '126px',
                    }}
                  >
                    <Text size={1} muted>
                      {title}
                    </Text>
                  </Card>
                ))}
              </Flex>
            </div>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
