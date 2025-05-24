import type {
  ConditionalPropertyCallbackContext,
  ValidationContext,
} from 'sanity'

export const sectionStyleIsBento = (
  context: ValidationContext | ConditionalPropertyCallbackContext,
): boolean => {
  const parent = context.parent as { _key: string } | undefined

  const document = context.document as
    | {
        body: {
          _key: string
          style: 'bento' | 'switcher'
          caseStudies: { _key: string }[]
        }[]
      }
    | undefined

  const caseStudyKey = parent?._key

  if (!document || !caseStudyKey) return false

  const section = document?.body?.find((section) => {
    return section.caseStudies?.some(
      (caseStudy) => caseStudy._key === caseStudyKey,
    )
  })

  if (!section) return false

  return section.style === 'bento'
}
