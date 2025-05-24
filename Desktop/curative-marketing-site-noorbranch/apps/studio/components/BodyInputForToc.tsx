import { Box } from '@sanity/ui'
import { PortableTextInputProps, useFormValue } from 'sanity'
import { TableOfContents } from './TableOfContents'

function BodyInputForToc(props: PortableTextInputProps) {
  const { value, renderDefault, path } = props
  // Get the parent path by removing the last segment
  const parentPath = path.slice(0, -1)
  const enableTableOfContents = useFormValue([...parentPath, 'enableTableOfContents']) ?? false
  const layout = useFormValue([...parentPath, 'layout']) ?? 'singleColumn'
  const showTableOfContents = enableTableOfContents && layout === 'singleColumn'
  
  console.log('Debug:', { enableTableOfContents, layout, path, parentPath, showTableOfContents })

  return (
    <Box>
      {renderDefault(props)}
      {showTableOfContents && (
        <Box marginTop={4}>
          <TableOfContents value={value} path={parentPath} />
        </Box>
      )}
    </Box>
  )
}

export default BodyInputForToc
