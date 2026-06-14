import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { customFetcher } from '@shared/api/runtime'
import type { noticesControllerFindOneResponse } from '@shared/api/generated/client'

export const load: PageLoad = async ({ params, fetch }) => {
  const result = await customFetcher<noticesControllerFindOneResponse>(
    `/notices/${params.noticeId}`,
    undefined,
    fetch,
  )
  if (!result.data) error(404, 'Notice not found')
  return { notice: result.data }
}
