import { writable } from 'svelte/store'

export const page = writable({
  status: 200,
  error: null,
  url: new URL('http://localhost/'),
  params: {} as Record<string, string>,
  route: { id: null as string | null },
  data: {} as Record<string, unknown>,
  form: undefined as unknown,
  state: {} as Record<string, unknown>,
})

export const navigating = writable(null)
export const updated = writable(false)
