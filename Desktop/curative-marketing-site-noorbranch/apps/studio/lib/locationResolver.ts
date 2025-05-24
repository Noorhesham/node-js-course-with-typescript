import type {
  DocumentLocationResolver,
  DocumentLocationsState,
} from '@sanity/presentation'
import { type Observable, map } from 'rxjs'
import { getRouteForDoc } from './getRouteForDoc'

export const locationResolver: DocumentLocationResolver = (params, context) => {
  const references$ = context.documentStore.listenQuery(
    '*[_id == $id || references($id)] { _type, seo, title, internalName }',
    params,
    { perspective: 'previewDrafts' },
  ) as Observable<
    | {
        _type: string
        seo?: { slug: { current: string } }
        title?: string
        internalName?: string
      }[]
    | null
  >

  return references$.pipe(
    map((references) => {
      if (!references) {
        return {
          message: 'Unable to resolve references for this document',
          tone: 'critical',
        } satisfies DocumentLocationsState
      }
      // We can only resolve locations for document types with slugs
      const pageLocations = references
        .filter(({ seo }) => seo?.slug?.current)
        .map(({ _type, title, internalName, seo }) => ({
          title: internalName || title || 'Title missing',
          href: `${getRouteForDoc({ _type, seo })}`,
        }))

      return {
        locations: [...pageLocations].filter(Boolean),
      } satisfies DocumentLocationsState
    }),
  )
}
