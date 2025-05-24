import type { PreviewProps, TypedObject } from 'sanity'
import { SimplifiedPreview } from '@/components/SimplifiedPreview'

interface PreviewHeroMarqueeProps extends PreviewProps {
  heading?: TypedObject[]
  body?: TypedObject[]
  badgeAnnouncement?: {
    enabled: boolean
    text: string
  }
}

export const PreviewHeroMarquee = (props: PreviewHeroMarqueeProps) => {
  const { heading, body, badgeAnnouncement } = props
  
  const badgeText = badgeAnnouncement?.enabled ? `🏷️ Badge: "${badgeAnnouncement.text}"` : ''
  const subtitleText = badgeAnnouncement?.enabled 
    ? `${badgeText}\n${body ? 'Has body content' : 'No body content'}`
    : body ? 'Has body content' : 'No body content'

  return (
    <SimplifiedPreview
      {...props}
      title={heading ? 'Has heading' : 'No heading added'}
      subtitle={subtitleText}
    />
  )
}
