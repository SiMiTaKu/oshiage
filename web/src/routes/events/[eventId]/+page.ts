import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { customFetcher } from '@shared/api/runtime'
import type { eventsControllerFindOneResponse } from '@shared/api/generated/client'

export const load: PageLoad = async ({ params, fetch }) => {
  const result = await customFetcher<eventsControllerFindOneResponse>(
    `/events/${params.eventId}`,
    undefined,
    fetch,
  )
  if (!result.data) error(404, 'Event not found')
  return { event: result.data }
}
