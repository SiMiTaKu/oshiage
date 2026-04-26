export async function customFetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  }

  const response = await fetch(url, {
    headers,
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json') ? await response.json() : undefined

  return {
    data,
    headers: response.headers,
    status: response.status,
  } as T
}
