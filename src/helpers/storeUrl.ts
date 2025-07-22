export const updateUrlWithQueryParams = (queryParams: Record<string, string | undefined>) => {
  const url = new URL(window.location.href)

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
  })

  window.history.pushState({}, '', url.toString())
}
