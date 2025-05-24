import type { PreviewProps } from 'sanity'

interface PreviewBetweenTheBracketPostProps extends PreviewProps {
  title: string
  'seo.slug.current': string
}

export const PreviewBetweenTheBracketPost = (props: PreviewBetweenTheBracketPostProps) => {
  const { renderDefault, title, 'seo.slug.current': slug } = props

  return (
    <div>
      <h1>{title}</h1>
      <p>{slug}</p>
    </div>
  )
}
