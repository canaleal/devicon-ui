import { useEffect } from 'react'

import useIconStore from '../../../../store/iconStore'
import { fetchIcons } from '../../../../service/iconService'

import AboutSection from '../../about/AboutSection'
import FilterSection from '../../filters/FilterSection'
import IconModalSection from '../../modal/IconModalSection'
import PaginationSection from '../../pagination/PaginationSection'
import { INIT_FILTER_GROUPS } from '../../filters/types'
import { populateIconFilters } from '../../filters/helpers'
import { DeviconBranch } from '../../../../types'


const GalleryPage = () => {
  const { deviconBranch, setIcons, setDeviconBranch, setFilterGroups, setSelectedIcon } = useIconStore()

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(location.search)
      const branch = params.get('branch') as DeviconBranch
      const selectedIconName = params.get('icon') as string

      if (branch) setDeviconBranch(branch)
      const tempIcons = await fetchIcons(branch || deviconBranch)

      if (tempIcons) {
        setIcons(tempIcons)
        setFilterGroups(INIT_FILTER_GROUPS.map((group) => populateIconFilters(tempIcons, group)))
        if (selectedIconName) setSelectedIcon(tempIcons.find((icon) => icon.name === selectedIconName) || null)
      }
    }

    init()
  }, [])

  return (
    <>
      <IconModalSection />
      <AboutSection />
      <FilterSection />
      <PaginationSection />
    </>
  )
}

export default GalleryPage
