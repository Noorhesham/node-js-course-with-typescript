import type { PreviewProps } from 'sanity'

interface PreviewBlogPostProps extends PreviewProps {
  title: string
  'seo.slug.current': string
}

export const PreviewBlogPost = (props: PreviewBlogPostProps) => {
  const { renderDefault, title, 'seo.slug.current': slug } = props

  return (
    <div>
      <h1>{title}</h1>
      <p>{slug}</p>
    </div>
  )
}
