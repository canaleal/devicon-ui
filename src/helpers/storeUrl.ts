export const updateUrlWithQueryParams = (queryParams: Record<string, string>) => {
  const url = new URL(window.location.href)
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  window.history.pushState({}, '', url.toString())
}
