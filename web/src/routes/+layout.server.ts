import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    isMobile: locals.isMobile,
  }
}
