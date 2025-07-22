import { useEffect } from 'react'
import { getQueryParams, useIcons } from './hooks/useGallery.ts'
import { FilterSection } from '../../filters/FilterSection'
import { IconModalWrapper } from '../../modal/IconModalWrapper'
import { InformationSection } from '../../about/InformationSection.tsx'
import { CDNBlockLink } from '../../../../components/Molecules/cdnBlockLink/CDNBlockLink.tsx'
import { Pagination } from '../../pagination'
import useIconStore from '../../../../store/iconStore.ts'
import { INIT_FILTER_GROUPS } from '../../filters/types'
import { populateIconFilters } from '../../filters/helpers'
import { LoadErrorWrapper } from './widgets/LoadErrorWrapper/LoadErrorWrapper.tsx'

const GalleryPage = () => {
  const {
    setIcons,
    setFilterGroups,
    setSelectedIcon,
    setDeviconBranch,
    icons,
    filteredIcons,
    deviconBranch,
    filterGroups,
    selectedIcon,
    setFilteredIcons
  } = useIconStore()

  const { branch, iconName } = getQueryParams()
  const { data: swrIcons, error, isLoading } = useIcons(branch)

  useEffect(() => {
    setDeviconBranch(branch)
  }, [branch, setDeviconBranch])

  useEffect(() => {
    if (!swrIcons) return

    setIcons(swrIcons)
    const filters = INIT_FILTER_GROUPS.map((group) => populateIconFilters(swrIcons, group))
    setFilterGroups(filters)

    if (iconName) {
      const selected = swrIcons.find((icon) => icon.name === iconName)
      setSelectedIcon(selected || null)
    }
  }, [swrIcons, iconName, setIcons, setFilterGroups, setSelectedIcon])

  return (
    <>


      <InformationSection />
      <CDNBlockLink branch={deviconBranch} />

      {selectedIcon && (
        <IconModalWrapper
          deviconBranch={deviconBranch}
          selectedIcon={selectedIcon}
          filteredIcons={filteredIcons}
          setSelectedIcon={setSelectedIcon}
        />
      )}

      <FilterSection
        icons={icons}
        filterGroups={filterGroups}
        deviconBranch={deviconBranch}
        setFilteredIcons={setFilteredIcons}
        setFilterGroups={setFilterGroups}
        setDeviconBranch={setDeviconBranch}
      />

      <LoadErrorWrapper isLoading={isLoading} error={error}>
        <Pagination filteredIcons={filteredIcons} />
      </LoadErrorWrapper>
    </>
  )
}

export default GalleryPage
