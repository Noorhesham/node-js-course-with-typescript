import { studioApiVersion } from '@/lib'
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toTitleCase } from '@/utils/strings'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient, type SanityClient } from 'sanity'
import { blockPreview } from 'sanity-pills'
import imageUrlBuilder from '@sanity/image-url'

interface PreviewArticleSpotlightProps extends PreviewProps {
  articles?: Array<{
    _type: 'reference'
    _ref: string
  }>
}

type ArticlePayload = {
  title?: string
  excerpt?: string
  featuredImage?: {
    _type: 'image'
    asset: {
      _ref: string
    }
  }
}

const fetchArticleDetails = async (
  client: SanityClient,
  articleRefs: string[],
  setter: (payload: (ArticlePayload | undefined)[]) => void,
) => {

  const articlePayloads = await Promise.all(
    articleRefs.map(async (ref) => {
      const article = await client.fetch<ArticlePayload>(
        `*[_type == "blogPost" && _id == $ref][0]{
          title,
          excerpt,
          featuredImage
        }`,
        { ref }
      )

      if (!article) return undefined
      return article
    })
  )

  if (!articlePayloads) return undefined
  setter(articlePayloads)
}

export const PreviewArticleSpotlight = (props: PreviewArticleSpotlightProps) => {
  const [articlePayloads, setArticlePayloads] = useState<(ArticlePayload | undefined)[]>([])
  const { renderDefault, articles } = props
  const client = useClient({ apiVersion: studioApiVersion })
  const builder = imageUrlBuilder(client)

  useEffect(() => {
    const articleRefs = articles?.map((article) => article._ref)
    if (!articleRefs) {
      return undefined
    }

    fetchArticleDetails(client, articleRefs, setArticlePayloads)
  }, [client, articles])

  const nothingToPreview = !articles || articles.length === 0

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No articles added yet' })
  }

  // Get component name from schema type
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType

  return (
    <Box>
      <Flex align="center" gap={3} paddingRight={3}>
        <Box flex={1}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      <Stack padding={2} space={3} paddingTop={0}>
        <Box paddingTop={2} paddingBottom={2} style={{ overflowX: 'auto', width: '100%' }}>
          <Flex gap={2} wrap="nowrap" style={{ width: 'max-content' }}>
            {articlePayloads?.map((article, index) => {
              if (!article) return undefined


              const excerptPreview = article.excerpt || undefined

              return (
                <Card
                  key={`${article.title}-${index}`}
                  padding={3}
                  border
                  style={{ width: '300px' }}
                >
                  <Stack space={3}>
                    {article.featuredImage?.asset?._ref && (
                      <Box style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={builder
                            .image(article.featuredImage.asset._ref)
                            .width(600)
                            .height(338)
                            .url()}
                          alt={article.title || ''}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                    {article.title && (
                      <Box>
                        <Text size={1} weight="medium">
                          {article.title}
                        </Text>
                      </Box>
                    )}
                    {excerptPreview && (
                      <Box>
                        <Text
                          size={1}
                          muted
                        >
                          {excerptPreview}
                        </Text>
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
