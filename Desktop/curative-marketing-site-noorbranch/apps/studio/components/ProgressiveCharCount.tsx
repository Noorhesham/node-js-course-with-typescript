import { Stack, Text, Box, TextInput, TextArea } from '@sanity/ui'
import { set, StringInputProps } from 'sanity'
import React from 'react'

function ProgressiveCharCount(props: StringInputProps) {
  const { value = '', schemaType, onChange } = props
  const length = value?.length || 0
  
  // Find the parent field name by looking at the path
  const fieldName = props.path[props.path.length - 1]
  
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange]
  )

  const getColor = () => {
    const isTitle = fieldName === 'pageTitle'
    const min = isTitle ? 50 : 150
    const max = isTitle ? 60 : 160
    return length >= min && length <= max ? '#2A9D8F' : '#E53E3E'
  }

  const getMessage = () => {
    const isTitle = fieldName === 'pageTitle'
    const min = isTitle ? 50 : 150
    const max = isTitle ? 60 : 160

    if (length >= min && length <= max) {
      return '(optimal character count)'
    } else if (length < min) {
      return '(below optimal character count)'
    } else {
      return '(above optimal character count)'
    }
  }

  return (
    <Stack space={2}>
      {schemaType.type === 'string' ? (
        <TextInput
          value={value}
          onChange={handleChange}
        />
      ) : (
        <TextArea
          value={value}
          onChange={handleChange}
          rows={3}
        />
      )}
      <Text size={1} style={{ color: getColor() }}>
        {`${length} characters ${getMessage()}`}
      </Text>
    </Stack>
  )
}

export default ProgressiveCharCount
