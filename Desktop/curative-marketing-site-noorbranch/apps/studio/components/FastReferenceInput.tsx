import { AddIcon, DocumentIcon, EditIcon, SearchIcon, SpinnerIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Stack, Text, TextInput, Badge, useTheme } from '@sanity/ui'
import { useCallback, useEffect, useState } from 'react'
import { useClient } from 'sanity'
import type { ObjectInputProps, Reference } from 'sanity'
import { set, PatchEvent } from 'sanity'
import { REFERENCABLE_DOCUMENT_TYPES } from '@/schemas/fields/linkTypes/internalLink'

const convertCamelCaseToTitleCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'  
}

type SearchResult = {
  _id: string
  _type: string
  title: string
  path: string
}

export function FastReferenceInput(props: ObjectInputProps) {
  const spinnerKeyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
  const { onChange } = props
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const client = useClient()
  const theme = useTheme()

  // Optimized search query that prioritizes exact matches
  const searchDocuments = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const results = await client.fetch<SearchResult[]>(
          `*[_type in $types && (title match $query + "*" || _id match $query + "*")][0...10]{
            _id,
            _type,
            title,
            "path": select(
              _type == "page" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "capabilitiesPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "technologyPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "stagePage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "paidLandingPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "listingPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "industryPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "useCasePage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "legalPage" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "blogPost" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "clientStory" => "/" + coalesce(seo.slug.current, slug.current),
              _type == "event" => "/events/" + coalesce(seo.slug.current, slug.current),
              _type == "guide" => "/guides/" + coalesce(seo.slug.current, slug.current),
              _type == "report" => "/reports/" + coalesce(seo.slug.current, slug.current),
              _type == "ebook" => "/ebooks/" + coalesce(seo.slug.current, slug.current),
              _type == "solutionsPage" => "/" + coalesce(seo.slug.current, slug.current),
              coalesce(seo.slug.current, slug.current)
            )
          }`,
          { 
            query: searchQuery,
            types: REFERENCABLE_DOCUMENT_TYPES 
          }
        )

        setResults(results)
      } catch (error) {
        setResults(null)
      } finally {
        setLoading(false)
      }
    },
    [client]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      searchDocuments(query)
    }, 100) // Debounce search

    return () => clearTimeout(timer)
  }, [query, searchDocuments])

  const handleSelect = useCallback(
    (item: SearchResult) => {
      if (!item?._id) return
      
      // Update using Sanity patch format
      onChange(PatchEvent.from([
        set({
          _ref: item._id.replace('drafts.', ''),
          _type: 'reference'
        })
      ]))

      // Clear the search
      setQuery('')
      setResults([])
    },
    [onChange]
  )

  return (
    <Stack space={2}>
      <Flex gap={1}>
        <Box flex={1}>
          <Box style={{position: 'relative'}}>
            <TextInput
              fontSize={2}
              icon={SearchIcon}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Type to search"
              radius={2}
              value={query}
            />
            {loading && (
              <Box style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <SpinnerIcon style={{animation: 'spin 0.5s linear infinite'}} />
              </Box>
            )}
          </Box>
        </Box>
        <Button fontSize={1} mode="ghost" text="Create..." icon={AddIcon} />
      </Flex>

      {query && !loading && (
        <Card border radius={2} overflow="hidden">
          <Stack>
            {results?.length > 0 ? (
              results.map((result) => (
                <Button
                  key={result._id}
                  mode="bleed"
                  onClick={() => handleSelect(result)}
                  padding={2}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <Flex align="center" justify="space-between" gap={3}>
                    <Flex align="center" gap={3} flex={1}>
                      <Box style={{border: `1px solid ${theme.sanity.color.base.border}`, width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                        <DocumentIcon />
                      </Box>
                      <Stack space={2}>
                        <Text size={1} fontWeight="medium">{truncateText(result.title, 50)}</Text>
                        <Text size={1} muted>{truncateText(result.path, 50)}</Text>
                      </Stack>
                    </Flex>
                    <Box>
                      <Badge mode="outline" size={0}>
                        {convertCamelCaseToTitleCase(result._type)}
                      </Badge>
                    </Box>
                  </Flex>
                </Button>
              ))
            ) : (
              <Box padding={4}>
                <Text size={1} muted align="center">
                  No results found
                </Text>
              </Box>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
