import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'
import { toTitleCase } from '@/utils/strings'
import { useClient } from 'sanity'
import { useEffect, useState } from 'react'
import { studioApiVersion } from '@/lib/api'

interface PreviewBrandTableProps extends PreviewProps {
  items?: Array<{
    heading: string
    brands: Array<{
      brandType: 'image' | 'company'
      logo?: { asset?: { url?: string } }
      company?: { _ref: string }
    }>
  }>
  schemaType?: {
    name: string
  }
  renderDefault?: (props: PreviewProps) => React.ReactElement
}

interface CompanyInfo {
  name: string
  logo?: { asset?: { url?: string } }
}

const fetchCompanyInfo = async (client: any, ref: string) => {
  const company = await client.fetch(
    `*[_id == $ref][0]{ name, logo }`,
    { ref }
  )
  return company
}

export const PreviewBrandTable = (props: PreviewBrandTableProps) => {
  const { items = [], schemaType, renderDefault } = props
  const [companyLogos, setCompanyLogos] = useState<Record<string, CompanyInfo>>({})
  const client = useClient({ apiVersion: studioApiVersion })
  
  useEffect(() => {
    const fetchCompanies = async () => {
      const companies: Record<string, CompanyInfo> = {}
      
      for (const row of items) {
        for (const brand of row.brands || []) {
          if (brand.brandType === 'company' && brand.company?._ref) {
            companies[brand.company._ref] = await fetchCompanyInfo(client, brand.company._ref)
          }
        }
      }
      
      setCompanyLogos(companies)
    }
    
    if (items?.length) {
      fetchCompanies()
    }
  }, [client, items])
  
  if (!items?.length) {
    return renderDefault?.({ ...props, title: 'Brand Table' })
  }

  const renderContent = () => (
    <Stack space={3} padding={2}>
      {items.map((row, rowIndex) => (
        <Stack key={rowIndex} space={2}>
          <Text size={1} weight="medium">
            {row.heading || `Row ${rowIndex + 1}`}
          </Text>
          <Flex gap={2} wrap="wrap">
            {(row.brands || []).map((brand, brandIndex) => {
              const companyInfo = brand.company?._ref ? companyLogos[brand.company._ref] : null
              const brandName = companyInfo?.name || 'Loading...'
              
              return (
                <Badge 
                  key={brandIndex} 
                  padding={2}
                  tone={brand.brandType === 'company' ? 'primary' : 'default'}
                >
                  {brand.brandType === 'company' ? brandName : 'Image Brand'}
                </Badge>
              )
            })}
          </Flex>
        </Stack>
      ))}
    </Stack>
  )

  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType

  return (
    <Box>
      <Flex align="center" paddingBottom={0} gap={2} paddingRight={2}>
        <Box flex={1} paddingBottom={0}>
          {renderDefault?.({ ...props, title: toTitleCase(componentName || '') })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={2}>
        <Card padding={2} border radius={2}>
          {renderContent()}
        </Card>
      </Stack>
    </Box>
  )
}
