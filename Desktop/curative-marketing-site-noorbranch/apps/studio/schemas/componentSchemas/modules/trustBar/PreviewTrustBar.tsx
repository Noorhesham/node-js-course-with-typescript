import { studioApiVersion } from '@/lib/api'
import { Badge, Box, Card, Flex, Stack, Text, useTheme } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'
import { toTitleCase } from '@/utils/strings'
import { imageBuilder } from '@/utils/client'

interface Props extends PreviewProps {
  companies?: {
    _ref?: string
  }[]
}

type CompanyPayload = {
  name?: string
  logotype?: {
    default?: {
      asset?: {
        _ref?: string
      }
    }
    onLight?: {
      asset?: {
        _ref?: string
      }
    }
    onDark?: {
      asset?: {
        _ref?: string
      }
    }
  }
}



export const PreviewTrustBar = (props: Props) => {
  const [companyPayloads, setCompanyPayloads] = useState<(CompanyPayload | null)[]>([])
  const client = useClient({ apiVersion: studioApiVersion })
  const { renderDefault, companies } = props
  const theme = useTheme()

  useEffect(() => {
    console.log('Initial companies prop:', companies)
    console.log('Props:', props)
    async function fetchCompanies() {
      if (!companies?.length) return

      console.log('Fetching companies...')
      const payloads = await Promise.all(
        companies.map(async (company) => {
          if (!company?._ref) return null

          console.log('Fetching company with ref:', company._ref)
          console.log('Fetching company details for ref:', company._ref)
          const payload = await client.fetch<CompanyPayload>(
            `*[_id == $ref][0]{
              name,
              'logotype': {
                'default': logotype.default,
                'onLight': logotype.onLight,
                'onDark': logotype.onDark
              }
            }`,
            { ref: company._ref }
          )
          return payload
        })
      )

      console.log('Fetched company payloads:', payloads)
      setCompanyPayloads(payloads)
    }

    fetchCompanies()
  }, [companies, client])

  const nothingToPreview = !companies || companies.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, titele: 'Trust Bar', subtitle: null })
  }

  if (!companyPayloads?.length) {
    return renderDefault({ ...props, subtitle: 'Loading companies...' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault({ ...props, title: 'Trust Bar', subtitle: null })}
        </Box>
      </Flex>
      <Stack padding={2} space={2}>
        <Box paddingTop={2} paddingBottom={2} style={{ overflowX: 'auto', width: '100%' }}>
          <Flex gap={2} wrap="nowrap" style={{ width: 'max-content' }}>
            {companyPayloads.map((company, index) => {
              if (!company) return null

              console.log('Rendering company:', company)
              const defaultRef = company.logotype?.default?.asset?._ref
              const onLightRef = company.logotype?.onLight?.asset?._ref
              const imageRef = defaultRef || onLightRef
              
              console.log('Logo refs:', {
                defaultRef,
                onLightRef,
                fullLogo: company.logotype
              })
              
              let imageUrl = null
              if (imageRef) {
                imageUrl = imageBuilder
                  .image(imageRef)
                  .width(80)
                  .url()
                console.log('Generated image URL:', imageUrl)
              }
              console.log('Company data:', {
                name: company.name,
                defaultRef,
                onLightRef,
                imageUrl
              })
              return (
                <Card key={index} padding={3} border>
                  <Stack space={3}>
                    {imageUrl && (
                      <Box style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={imageUrl}
                          alt={company.name || `Company ${index + 1}`}
                          style={{ 
                            height: '100%',
                            width: 'auto',
                            maxWidth: '80px',
                            filter: theme.sanity.color.dark ? 'brightness(0) invert(1)' : 'brightness(0)',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                    )}
                    {company.name && (
                      <Box>
                        <Text size={1} align="center">{company.name}</Text>
                      </Box>
                    )}
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </Box>
      </Stack>
    </Box>
  )
}
