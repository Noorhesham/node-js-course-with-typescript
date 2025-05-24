import { hues } from '@sanity/color'
import { Code, Flex, TextInput, useTheme_v2 } from '@sanity/ui'
import { type FormEvent, useCallback, useState } from 'react'
import { type Slug, type TextInputProps, set, unset } from 'sanity'
import { useDocumentPane } from 'sanity/structure'

interface PrefixedSlugInputOptions {
  slugPrefix?: string
  includeSlugPrefixInStoredValue?: boolean
}

export const PrefixedSlugInput = (props: TextInputProps) => {
  const { value, onChange } = props
  const { schemaType } = useDocumentPane()
  const { slugPrefix, includeSlugPrefixInStoredValue = false } =
    schemaType.fields.find((field) => field.name === 'seo')?.type
      .options as PrefixedSlugInputOptions
  const storedSlugCurrent = (value as Slug | undefined)?.current
  
  // Don't use a prefix for regular pages
  const shouldUsePrefix = slugPrefix && schemaType.name !== 'page'
  
  // Always remove prefix from display value, but keep it in stored value
  const editablePortion = storedSlugCurrent ? (
    storedSlugCurrent.startsWith(`${slugPrefix}/`) ?
      storedSlugCurrent.replace(`${slugPrefix}/`, '') :
      storedSlugCurrent
  ) : ''
  
  const [editedSlug, setEditedSlug] = useState(editablePortion)
  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const backgroundColor = isDarkMode ? hues.gray[950].hex : hues.gray[50].hex
  const borderColor = isDarkMode ? hues.gray[800].hex : hues.gray[200].hex

  const handleChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) => {
      const editedValue = evt.currentTarget.value.trim()

      if (editedValue === '') {
        onChange(unset())
        return
      }

      // If the edited value already has the prefix, remove it first
      const cleanValue = shouldUsePrefix && editedValue.startsWith(`${slugPrefix}/`) ?
        editedValue.replace(`${slugPrefix}/`, '') :
        editedValue

      // Include prefix in stored value only if it's not a regular page
      const fullSlugCurrent = shouldUsePrefix ? `${slugPrefix}/${cleanValue}` : cleanValue

      const fullSlug = {
        _type: 'slug',
        current: fullSlugCurrent,
      }

      onChange(set(fullSlug))
      setEditedSlug(cleanValue)
    },
    [includeSlugPrefixInStoredValue, slugPrefix, onChange, shouldUsePrefix],
  )

  // If the value is changed by another user, update the editedSlug state
  if (editablePortion !== editedSlug) {
    setEditedSlug(editablePortion)
  }

  const displayedPrefix = shouldUsePrefix ? `/${slugPrefix}/` : '/'

  return (
    <Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        paddingX={2}
        style={{
          height: '33px',
          backgroundColor,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderTopLeftRadius: '3px',
          borderBottomLeftRadius: '3px',
        }}
      >
        <Code size={1} muted>
          {displayedPrefix}
        </Code>
      </Flex>
      <div style={{ flex: 1 }}>
        <TextInput
          rows={1}
          id="slug-input"
          placeholder="slug"
          onChange={handleChange}
          style={{
            transform: 'translateX(-2px)',
            flex: 1,
          }}
          value={editedSlug}
        />
      </div>
    </Flex>
  )
}
