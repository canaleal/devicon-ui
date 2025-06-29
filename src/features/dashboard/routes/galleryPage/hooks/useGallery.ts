import { useEffect } from 'react'
import { DeviconBranch } from '../../../../../types'
import useIconStore from '../../../../../store/iconStore.ts'
import { fetchIcons } from '../../../../../service/iconService.ts'
import { INIT_FILTER_GROUPS } from '../../../filters/types'
import { populateIconFilters } from '../../../filters/helpers'
import useSWR from 'swr'

export const useIcons = (branch: DeviconBranch) => {
  return useSWR(['icons', branch], () => fetchIcons(branch), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    suspense: false
  })
}

export const getQueryParams = (): { branch: DeviconBranch; iconName: string | null } => {
  const params = new URLSearchParams(location.search)
  const branch = (params.get('branch') as DeviconBranch) || 'master'
  const iconName = params.get('icon')
  return { branch, iconName }
}

export const useGallery = () => {
  const { setIcons, setFilterGroups, setSelectedIcon, setDeviconBranch } = useIconStore()
  const { branch, iconName } = getQueryParams()
  const { data: icons, error, isLoading } = useIcons(branch)

  useEffect(() => {
    setDeviconBranch(branch)
  }, [branch, setDeviconBranch])

  useEffect(() => {
    if (!icons) return

    setIcons(icons)

    const filters = INIT_FILTER_GROUPS.map((group) => populateIconFilters(icons, group))
    setFilterGroups(filters)

    if (iconName) {
      const selected = icons.find((icon) => icon.name === iconName)
      setSelectedIcon(selected || null)
    }
  }, [icons, iconName, setIcons, setFilterGroups, setSelectedIcon])

  return { icons, error, isLoading }
}
