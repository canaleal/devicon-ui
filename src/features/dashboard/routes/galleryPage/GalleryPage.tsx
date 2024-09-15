import { useEffect } from 'react'

import useIconStore from '../../../../store/iconStore'
import storage from '../../../../helpers/storage'
import { fetchIcons } from '../../../../service/iconService'

import AboutSection from '../../about/AboutSection'
import FilterSection from '../../filters/FilterSection'
import IconModalSection from '../../modal/IconModalSection'
import PaginationSection from '../../pagination/PaginationSection'
import { INIT_FILTER_GROUPS } from '../../filters/types'
import { populateIconFilters } from '../../filters/helpers'

const GalleryPage = () => {
  const { deviconBranch, setIcons, setDeviconBranch, setFilterGroups } = useIconStore()

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(location.search)
      const branch = (params.get('branch') as string) || storage.getToken().deviconBranch || deviconBranch
      const tempIcons = await fetchIcons(branch)
      const initFilterGroups = INIT_FILTER_GROUPS.map((group) => populateIconFilters(tempIcons, group))
      setIcons(tempIcons)
      setDeviconBranch(branch)
      setFilterGroups(initFilterGroups)
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
