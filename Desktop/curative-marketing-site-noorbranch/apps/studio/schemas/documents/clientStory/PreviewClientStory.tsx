import type { PreviewProps } from 'sanity'

interface PreviewClientStoryProps extends PreviewProps {
  title: string
  'seo.slug.current': string
}

export const PreviewClientStory = (props: PreviewClientStoryProps) => {
  const { renderDefault, title, 'seo.slug.current': slug } = props

  return (
    <div>
      <h1 style={{fontSize: '14px'}}>{title}</h1>
      <p>{slug}</p>
    </div>
  )
}
