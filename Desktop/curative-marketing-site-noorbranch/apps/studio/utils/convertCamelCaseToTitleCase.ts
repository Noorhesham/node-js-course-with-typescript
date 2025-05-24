export const convertCamelCaseToTitleCase = (camelCase: string) => {
  if (!camelCase) return ''

  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}
