import { sanityClient } from './client'

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sanityClient.fetch<T>(query, params as any)
}
