import type { PageLoad } from './$types'
import { customFetcher } from '@shared/api/runtime'
import type { EntityListResponseDto } from '@shared/api/generated/client'

export const load: PageLoad = async ({ url, fetch }) => {
  const page = Number(url.searchParams.get('page') ?? '1')
  const category = url.searchParams.get('category') ?? undefined
  const activeStatus = url.searchParams.get('status') ?? undefined
  const params = new URLSearchParams({ page: String(page), limit: '20' })
  if (category) params.set('category', category)
  if (activeStatus) params.set('activeStatus', activeStatus)
  const result = await customFetcher<{
    data: EntityListResponseDto
    headers: Headers
    status: number
  }>(`/entities?${params}`, undefined, fetch)
  return {
    entities: result.data?.items ?? [],
    total: result.data?.total ?? 0,
    page,
    category: category ?? '',
    activeStatus: activeStatus ?? '',
  }
}
