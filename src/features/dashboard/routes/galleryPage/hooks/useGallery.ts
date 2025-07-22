import { DEVICON_BRANCH, DeviconBranch, URL_PARAMS } from '../../../../../types'
import { fetchIcons } from '../../../../../service/iconService.ts'
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
  const branch = (params.get(URL_PARAMS.BRANCH) as DeviconBranch) || DEVICON_BRANCH.MASTER
  const iconName = params.get(URL_PARAMS.ICON)
  return { branch, iconName }
}
