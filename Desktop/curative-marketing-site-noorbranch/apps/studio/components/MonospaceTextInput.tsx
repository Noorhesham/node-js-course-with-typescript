import { TextArea } from '@sanity/ui'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { type TextInputProps, set, unset } from 'sanity'

export const MonospaceTextInput = (props: TextInputProps) => {
  const { value, onChange } = props
  const stringifiedValue = value
  const [editValue, setEditValue] = useState(stringifiedValue)

  const onEditorChange = useCallback(
    (evt: FormEvent<HTMLTextAreaElement>) => {
      const newValue = evt.currentTarget.value

      setEditValue(newValue)

      if (newValue.trim() === '') {
        onChange(unset())
        return
      }

      onChange(set(newValue))
    },
    [onChange],
  )

  useEffect(() => {
    setEditValue(value)
  }, [value])

  return (
    <TextArea
      rows={15}
      style={{ fontFamily: 'monospace' }}
      onChange={onEditorChange}
    >
      {editValue}
    </TextArea>
  )
}
