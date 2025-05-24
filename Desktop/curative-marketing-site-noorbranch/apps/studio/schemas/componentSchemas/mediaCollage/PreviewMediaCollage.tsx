import { Box, Card, Flex, Badge } from '@sanity/ui'
import { studioApiVersion } from '@/lib/api'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'
import { toTitleCase } from '@/utils/strings'

interface PreviewMediaCollageProps extends PreviewProps {
  images: { asset: { _ref: string } }[]
  schemaType?: {
    name: string
  }
}

export const PreviewMediaCollage = (props: PreviewMediaCollageProps) => {
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>([])
  const { renderDefault, images, schemaType } = props

  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const getImageUrls = async () => {
      if (!images?.length) return
      const imageUrls = await client.fetch('*[_id in $imageIds].url', {
        imageIds: images.map((image) => image.asset._ref),
      })
      setGalleryImageUrls(imageUrls)
    }

    getImageUrls()
  }, [images, client])

  const nothingToPreview = !images || images.length === 0
  const componentName = typeof schemaType === 'object' ? schemaType.name : schemaType

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No images selected' })
  }

  return (
    <Box>
      <Flex align="center" paddingBottom={0} gap={2} paddingRight={2}>
        <Box flex={1} paddingBottom={0}>
          {renderDefault(props)}
        </Box>
        {componentName && (
          <Badge mode="outline">
            {toTitleCase(componentName)}
          </Badge>
        )}
      </Flex>
      {galleryImageUrls?.length > 0 && (
        <div style={{ overflowX: 'scroll' }}>
          <Flex dir="row" gap={2}>
            {galleryImageUrls.map((url) => (
              <Card
                key={url}
                marginTop={2}
                flex={1}
                style={{
                  minWidth: '133px',
                  height: '100px',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                border
              />
            ))}
          </Flex>
        </div>
      )}
    </Box>
  )
}
