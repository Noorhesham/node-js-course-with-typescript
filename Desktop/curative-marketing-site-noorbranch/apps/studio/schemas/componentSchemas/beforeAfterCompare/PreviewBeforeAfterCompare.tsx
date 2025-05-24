import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'
import { imageBuilder } from '@/utils/client'
import { toTitleCase } from '@/utils/strings'

interface Company {
  title?: string
  before?: {
    asset?: {
      _ref?: string
    }
  }
  after?: {
    asset?: {
      _ref?: string
    }
  }
}

interface PreviewBeforeAfterCompareProps extends PreviewProps {
  companies?: Company[]
  schemaType?: {
    name: string
  }
  renderDefault?: (props: PreviewProps) => React.ReactElement
}

export const PreviewBeforeAfterCompare = (props: PreviewBeforeAfterCompareProps) => {
  const { companies = [], renderDefault, schemaType } = props
  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType

  const renderCompany = (company: Company) => {
    const beforeUrl = company.before?.asset?._ref
      ? imageBuilder.image(company.before.asset._ref).width(200).height(150).fit('crop').url()
      : undefined

    const afterUrl = company.after?.asset?._ref
      ? imageBuilder.image(company.after.asset._ref).width(200).height(150).fit('crop').url()
      : undefined

    return (
      <Card padding={3} border radius={2} marginBottom={2}>
        <Stack space={2}>
          <Text size={1} weight="medium">
            {company.title || 'Untitled Company'}
          </Text>
          <Flex gap={3}>
            {/* Before Image */}
            <Card tone="transparent" padding={2} flex={1}>
              {beforeUrl ? (
                <img
                  src={beforeUrl}
                  alt="Before"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <Flex
                  justify="center"
                  align="center"
                  style={{ height: '150px', background: '#f3f3f3', borderRadius: '4px' }}
                >
                  <Text size={1} muted>No Before Image</Text>
                </Flex>
              )}
              <Text size={0} muted style={{ marginTop: '4px', textAlign: 'center' }}>Before</Text>
            </Card>

            {/* After Image */}
            <Card tone="transparent" padding={2} flex={1}>
              {afterUrl ? (
                <img
                  src={afterUrl}
                  alt="After"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <Flex
                  justify="center"
                  align="center"
                  style={{ height: '150px', background: '#f3f3f3', borderRadius: '4px' }}
                >
                  <Text size={1} muted>No After Image</Text>
                </Flex>
              )}
              <Text size={0} muted style={{ marginTop: '4px', textAlign: 'center' }}>After</Text>
            </Card>
          </Flex>
        </Stack>
      </Card>
    )
  }

  return (
    <Box>
      <Flex align="center" paddingBottom={2} gap={2}>
        <Box flex={1}>
          {renderDefault?.({ ...props, title: toTitleCase(componentName || '') })}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      {companies[0] ? (
        renderCompany(companies[0])
      ) : (
        <Card padding={3} border radius={2}>
          <Text size={1} muted style={{ textAlign: 'center' }}>
            No companies added
          </Text>
        </Card>
      )}
      {companies.length > 1 && (
        <Text size={1} muted style={{ textAlign: 'center', marginTop: 2 }}>
          +{companies.length - 1} more {companies.length === 2 ? 'company' : 'companies'}
        </Text>
      )}
    </Box>
  )
}
