import type { ConditionalProperty } from 'sanity'
import { CalloutUiForm } from './CalloutUiForm'

interface CalloutUiOptions {
  name?: string
  title?: string
  heading?: string
  body?: string
  group?: string | string[]
  hidden?: ConditionalProperty
}

export const defineCalloutUIField = ({
  name = 'calloutUI',
  title = 'Callout UI',
  group,
  hidden,
  heading,
  body,
}: CalloutUiOptions) => {
  return {
    name,
    title,
    group,
    hidden,
    type: 'string',
    options: { heading, body },
    components: {
      field: CalloutUiForm,
    },
  }
}
