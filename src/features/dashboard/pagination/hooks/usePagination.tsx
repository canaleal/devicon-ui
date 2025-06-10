import { useState, useEffect, useMemo } from 'react'
import { IIcon } from '../../../../types'

const usePagination = (icons: IIcon[], perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [icons])

  const totalPages = Math.ceil(icons.length / perPage) || 1

  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return icons.slice(start, start + perPage)
  }, [icons, currentPage, perPage])

  return {
    paginatedIcons,
    currentPage,
    totalPages,
    setCurrentPage
  }
}

export default usePagination
