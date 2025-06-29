import { useGallery } from './hooks/useGallery.ts'
import FilterSection from '../../filters/FilterSection'
import IconModalSection from '../../modal/IconModalSection'
import { InformationSection } from '../../about/AboutSection'
import { CDNBlockLink } from '../../../../components/Molecules/cdnBlockLink/CDNBlockLink.tsx'
import { Pagination } from '../../pagination'
import useIconStore from '../../../../store/iconStore.ts'

const GalleryPage = () => {
  useGallery()

  const { deviconBranch,} = useIconStore()

  return (
    <>
      <FilterSection />
      <IconModalSection />
      <InformationSection />
      <CDNBlockLink branch={deviconBranch} />
      <Pagination />
    </>
  )
}

export default GalleryPage
