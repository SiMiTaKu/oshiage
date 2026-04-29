import type { PageLoad } from './$types'
import { customFetcher } from '../../shared/api/runtime'
import type { EventListResponseDto } from '../../shared/api/generated/client'

export const load: PageLoad = async ({ url, fetch }) => {
  const page = Number(url.searchParams.get('page') ?? '1')
  const eventType = url.searchParams.get('type') ?? undefined
  const params = new URLSearchParams({ page: String(page), limit: '20' })
  if (eventType) params.set('eventType', eventType)
  const result = await customFetcher<{
    data: EventListResponseDto
    headers: Headers
    status: number
  }>(`/events?${params}`, undefined, fetch)
  return {
    events: result.data?.items ?? [],
    total: result.data?.total ?? 0,
    page,
    eventType: eventType ?? '',
  }
}
