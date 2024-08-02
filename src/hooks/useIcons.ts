import { useState, useEffect } from 'react'
import { createDeviconJsonUrl } from '../helpers/iconUrl'
import { DeviconBranch, IIcon } from '../types'
import storage from '../helpers/storage'

export const useIcons = (deviconBranch: DeviconBranch): IIcon[] => {
  const [icons, setIcons] = useState<IIcon[]>([])

  useEffect(() => {
    const fetchIconsFromBranch = async (): Promise<IIcon[]> => {
      const response = await fetch(createDeviconJsonUrl(deviconBranch))
      return response.json()
    }

    const initializeIconsData = async () => {
      const fetchedIcons = await fetchIconsFromBranch()
      setIcons(fetchedIcons)
    }

    initializeIconsData()
  }, [deviconBranch])

  return icons
}

export const useSelectedIcon = (icons: IIcon[]) => {
  const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.has('icon')) {
      const icon = icons.find((i) => i.name === params.get('icon'))
      if (icon) setSelectedIcon(icon)
    }
  }, [icons])

  return { selectedIcon, setSelectedIcon }
}

export const useDeviconBranch = () => {
  const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>('develop')

  useEffect(() => {
    // Get from url
    const params = new URLSearchParams(location.search)
    const branch = params.get('branch')
    if (branch) {
      setDeviconBranch(branch as DeviconBranch)
      return
    }

    const token = storage.getToken()
    if (token.deviconBranch) {
      setDeviconBranch(token.deviconBranch)
    }
  }, [])

  return { deviconBranch, setDeviconBranch }
}
