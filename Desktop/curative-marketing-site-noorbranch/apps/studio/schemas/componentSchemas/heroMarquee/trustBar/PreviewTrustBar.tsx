import { studioApiVersion } from '@/lib/api'
import { Box, Flex, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, type SanityClient, useClient } from 'sanity'

interface PreviewTrustBarProps extends PreviewProps {
  companies: {
    _ref: string
  }[]
}

const fetchCompanies = async (
  client: SanityClient,
  companies: { _ref: string }[],
) => {
  if (!companies) {
    return null
  }

  const companyRefs = companies.map((company) => company._ref)

  return client.fetch(
    `*[_type == "company" && _id in $companyRefs] {
      name
    }`,
    { companyRefs },
  )
}

export const PreviewTrustBar = (props: PreviewTrustBarProps) => {
  const [companyNames, setCompanyNames] = useState<{ name: string }[]>([])
  const client = useClient({
    apiVersion: studioApiVersion,
  })
  const { renderDefault, companies } = props

  useEffect(() => {
    fetchCompanies(client, companies).then((names) => setCompanyNames(names))
  }, [client, companies])

  return (
    <Box>
      {renderDefault(props)}
      {companyNames && (
        <Box padding={3}>
          <div style={{ overflowX: 'scroll' }}>
            <Flex dir="row" gap={2}>
              {companyNames?.map((company) => (
                <Box
                  key={`company-${company.name}`}
                  padding={1}
                  paddingBottom={2}
                  style={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    minWidth: 'maxContent !important',
                    overflow: 'hidden',
                  }}
                >
                  <Text style={{ minWidth: 'maxContent !important' }}>
                    {company.name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </div>
        </Box>
      )}
    </Box>
  )
}
