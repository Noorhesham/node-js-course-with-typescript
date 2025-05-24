export const alphabetizeByType = (
  array: { type: string; value?: string }[],
) => {
  return array.sort((a, b) => a.type.localeCompare(b.type))
}

export const alphabetizeByTitle = (
  array: { title: string; value: string }[],
) => {
  return array.sort((a, b) => a.title.localeCompare(b.title))
}
