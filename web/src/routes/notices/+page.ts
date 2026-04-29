import type { PageLoad } from './$types'
import { customFetcher } from '../../shared/api/runtime'
import type { NoticeListResponseDto } from '../../shared/api/generated/client'

export const load: PageLoad = async ({ url, fetch }) => {
  const page = Number(url.searchParams.get('page') ?? '1')
  const noticeType = url.searchParams.get('type') ?? undefined
  const params = new URLSearchParams({ page: String(page), limit: '20' })
  if (noticeType) params.set('noticeType', noticeType)
  const result = await customFetcher<{
    data: NoticeListResponseDto
    headers: Headers
    status: number
  }>(`/notices?${params}`, undefined, fetch)
  return {
    notices: result.data?.items ?? [],
    total: result.data?.total ?? 0,
    page,
    noticeType: noticeType ?? '',
  }
}
