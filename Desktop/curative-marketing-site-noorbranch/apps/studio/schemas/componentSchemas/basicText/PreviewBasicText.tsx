import type { PreviewProps, TypedObject } from 'sanity'
import { SimplifiedPreview } from '@/components/SimplifiedPreview'

interface PreviewBasicTextProps extends PreviewProps {
  title?: string
  panelLayout?: 'singleColumn' | 'twoColumns'
  body?: TypedObject[]
  bodyRight?: TypedObject[]
}

export const PreviewBasicText = (props: PreviewBasicTextProps) => {
  const { body, bodyRight, panelLayout } = props

  const hasContent = body || bodyRight
  const subtitle = hasContent
    ? `${panelLayout === 'twoColumns' ? 'Two-column' : 'Single-column'} text`
    : 'No text added'

  return <SimplifiedPreview {...props} subtitle={subtitle} />
}
