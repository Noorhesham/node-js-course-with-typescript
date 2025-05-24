import { Box, Flex, Badge } from '@sanity/ui'
import { useClient } from 'sanity'
import { studioApiVersion } from '@/lib'
import { toTitleCase } from '@/utils/strings'
import { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'

interface PersonPayload {
  firstName: string
  lastName: string
  headshot?: {
    asset?: {
      _ref: string
    }
  }
}

interface PreviewTeamBlockProps {
  renderDefault: (props: any) => JSX.Element
  teammates?: Array<{ _ref: string }>
  schemaType: string | { name: string }
}

export const PreviewTeamBlock = (props: PreviewTeamBlockProps) => {
  const { renderDefault, teammates = [] } = props
  const [teamPayloads, setTeamPayloads] = useState<(PersonPayload | null)[]>([])
  const client = useClient({ apiVersion: studioApiVersion })
  const builder = imageUrlBuilder(client)

  useEffect(() => {
    async function fetchTeammates() {
      if (!teammates?.length) return

      const payloads = await Promise.all(
        teammates.map(async (teammate) => {
          if (!teammate?._ref) return null

          const payload = await client.fetch<PersonPayload>(
            `*[_id == $ref][0]{
              firstName,
              lastName,
              headshot
            }`,
            { ref: teammate._ref }
          )
          return payload
        })
      )
      setTeamPayloads(payloads)
    }

    fetchTeammates()
  }, [teammates, client])

  const nothingToPreview = !teammates || teammates.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No teammates added yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({
            ...props,
            subtitle: teammates?.length ? `${teammates.length} teammates` : 'No teammates'
          })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      {teamPayloads.length > 0 && (
        <div style={{ overflowX: 'scroll' }}>
          <Flex margin={2} marginTop={2} gap={2}>
            {teamPayloads.map((teammate, index) => (
              teammate?.headshot?.asset?._ref ? (
                <Box key={index} style={{ minWidth: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                  <img
                    src={builder.image(teammate.headshot.asset._ref).width(40).height(40).fit('crop').url()}
                    alt={`${teammate.firstName} ${teammate.lastName}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ) : (
                <Box
                  key={index}
                  style={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
                  {teammate?.firstName?.charAt(0) || '?'}
                </Box>
              )
            ))}
          </Flex>
        </div>
      )}
    </Box>
  )
}
