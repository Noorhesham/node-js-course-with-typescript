import type { PreviewProps } from 'sanity'
import { SimplifiedPreview } from '@/components/SimplifiedPreview'

export const PreviewJobListing = (props: PreviewProps) => {
  return <SimplifiedPreview {...props} title="Job Listing" subtitle={undefined} />
}
