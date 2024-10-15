export const updateUrlWithQueryParams = (queryParams: Record<string, string | undefined>) => {
  const url = new URL(window.location.href)

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) {
      // Set the query param if the value exists
      url.searchParams.set(key, value)
    } else {
      // Remove the query param if the value is empty
      url.searchParams.delete(key)
    }
  })

  window.history.pushState({}, '', url.toString())
}
