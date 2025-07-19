import { useGallery } from './hooks/useGallery.ts'
import FilterSection from '../../filters/FilterSection'
import IconModalSection from '../../modal/IconModalSection'
import { InformationSection } from '../../about/AboutSection'
import { CDNBlockLink } from '../../../../components/Molecules/cdnBlockLink/CDNBlockLink.tsx'
import { Pagination } from '../../pagination'
import useIconStore from '../../../../store/iconStore.ts'

const GalleryPage = () => {
  useGallery()

  const {
    icons,
    filteredIcons,
    deviconBranch,
    filterGroups,
    selectedIcon,
    setIcons,
    setFilteredIcons,
    setDeviconBranch,
    setFilterGroups,
    setSelectedIcon
  } = useIconStore()

  return (
    <>
      {selectedIcon && (
        <IconModalSection
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
        setIcons={setIcons}
        setFilteredIcons={setFilteredIcons}
        setFilterGroups={setFilterGroups}
        setDeviconBranch={setDeviconBranch}
      />
      <InformationSection />
      <CDNBlockLink branch={deviconBranch} />
      <Pagination filteredIcons={filteredIcons} />
    </>
  )
}

export default GalleryPage
