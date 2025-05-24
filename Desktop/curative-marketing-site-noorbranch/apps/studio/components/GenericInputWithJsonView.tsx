import { Inline, Stack, Switch, Text, TextArea } from '@sanity/ui'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { type InputProps, set, unset, useCurrentUser } from 'sanity'

const stringify = (value: unknown) => JSON.stringify(value, null, 2)

const tryParse = (value: string): unknown => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return 'INVALID_VALUE'
  }
}

export const GenericInputWithJsonView = (props: InputProps) => {
  const { value, onChange } = props
  const [shouldShowJson, setShouldShowJson] = useState(false)
  const stringifiedValue = stringify(value)
  const [editValue, setEditValue] = useState(stringifiedValue)
  const user = useCurrentUser()
  const userIsDeveloper = user?.roles.some((role) =>
    ['developer', 'administrator'].includes(role.name),
  )

  const onEditorChange = useCallback(
    (evt: FormEvent<HTMLTextAreaElement>) => {
      const newValue = evt.currentTarget.value

      setEditValue(newValue)

      if (newValue.trim() === '') {
        onChange(unset())
        return
      }

      const parsedValue = tryParse(newValue)

      if (parsedValue !== 'INVALID_VALUE') {
        onChange(set(parsedValue))
      }
    },
    [onChange],
  )

  useEffect(() => {
    setEditValue(stringify(value))
  }, [value])

  if (!userIsDeveloper) {
    return props.renderDefault(props)
  }

  return (
    <Stack space={2}>
      <Inline space={2} style={{ textAlign: 'right' }}>
        <Switch
          checked={shouldShowJson}
          onChange={() => setShouldShowJson(!shouldShowJson)}
        />
        <Text size={1} muted>
          Show JSON
        </Text>
      </Inline>
      {shouldShowJson ? (
        <TextArea
          rows={15}
          style={{ fontFamily: 'monospace' }}
          onChange={onEditorChange}
        >
          {editValue}
        </TextArea>
      ) : (
        props.renderDefault(props)
      )}
    </Stack>
  )
}
