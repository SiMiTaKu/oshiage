import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { customFetcher } from '@shared/api/runtime'
import type {
  entitiesControllerFindOneResponse,
  entitiesControllerFindRevisionsResponse,
} from '@shared/api/generated/client'

export const load: PageLoad = async ({ params, fetch }) => {
  const id = params.entityId
  const [entityRes, revisionsRes] = await Promise.all([
    customFetcher<entitiesControllerFindOneResponse>(`/entities/${id}`, undefined, fetch),
    customFetcher<entitiesControllerFindRevisionsResponse>(
      `/entities/${id}/revisions`,
      undefined,
      fetch,
    ),
  ])
  if (!entityRes.data) error(404, 'Entity not found')
  return {
    entity: entityRes.data,
    revisions: revisionsRes.data?.revisions ?? [],
  }
}
