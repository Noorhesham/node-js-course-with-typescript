import { studioApiVersion } from '@/lib/api'
import { Box, Card, Flex } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, useClient } from 'sanity'

interface PreviewImageGalleryProps extends PreviewProps {
  type: 'single' | 'gallery'
  imageUrl?: string
  images: { asset: { _ref: string } }[]
}

export const PreviewImageGallery = (props: PreviewImageGalleryProps) => {
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>([])
  const { renderDefault, imageUrl, images } = props

  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const getImageUrls = async (images: { asset: { _ref: string } }[]) => {
      const imageUrls = await client.fetch('*[_id in $imageIds].url', {
        imageIds: images.map((image) => image.asset._ref),
      })

      setGalleryImageUrls(imageUrls)
    }

    getImageUrls(images)
  }, [images, client])

  const nothingToPreview = !imageUrl && !images

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No image(s) selected' })
  }

  return (
    <Box>
      {renderDefault(props)}
      {galleryImageUrls?.length > 0 && (
        <div style={{ overflowX: 'scroll' }}>
          <Flex dir="row" gap={2}>
            {galleryImageUrls.map((url) => (
              <Card
                key={url}
                margin={3}
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
