import { studioApiVersion } from '@/lib/api'
import { Box, Card } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, type SanityClient, useClient, type PreviewLayoutKey } from 'sanity'

interface PreviewCompanyProps extends PreviewProps<PreviewLayoutKey> {
  company?: {
    _ref: string
  };
  logo?: { asset: { _ref: string } };
}

const fetchCompany = async (
  client: SanityClient,
  company: { _ref: string },
) => {
  if (!company) {
    return null
  }

  const companyRef = company._ref

  return client.fetch(
    `*[_type == "company" && _id == $companyRef][0] {
      logotype {
        default {
          asset->{
            url
          }
        }
      }
    }`,
    { companyRef },
  )
}

const fetchLogo = async (
  client: SanityClient,
  logo: { asset: { _ref: string } },
) => {
  if (!logo) {
    return null
  }

  return client.fetch(
    `*[_id == $logoRef].url[0]`,
    { logoRef: logo.asset._ref },
  )
}

export const PreviewCompany: React.ComponentType<PreviewProps<PreviewLayoutKey>> = (props: PreviewCompanyProps) => {
  const [companyLogo, setCompanyLogo] = useState<{ name: string }[]>([])
  const client = useClient({
    apiVersion: studioApiVersion,
  })
  const { renderDefault, company, logo } = props

  useEffect(() => {
    if (company) {
      fetchCompany(client, company).then((item) => setCompanyLogo(item?.logotype?.default?.asset?.url))
    } else if (logo) {
      fetchLogo(client, logo).then((item) => setCompanyLogo(item))
    }
  }, [client, company, logo])

  return (
    <Box>
      {renderDefault(props)}
      {companyLogo && (
        <Box padding={3}>
          <div style={{ overflowX: 'scroll' }}>
            <Card
              margin={3}
              marginTop={2}
              flex={1}
              style={{
                minWidth: '133px',
                height: '24px',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${companyLogo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              border
            />
          </div>
        </Box>
      )}
    </Box>
  )
}
