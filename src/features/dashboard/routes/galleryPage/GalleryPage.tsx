import { useEffect } from 'react'
import useIconStore from '../../../../store/iconStore'
import { fetchIcons } from '../../../../service/iconService'
import AboutSection from '../../about/AboutSection'
import FilterSection from '../../filters/FilterSection'
import IconModalSection from '../../modal/IconModalSection'
import { INIT_FILTER_GROUPS } from '../../filters/types'
import { populateIconFilters } from '../../filters/helpers'
import { DeviconBranch } from '../../../../types'
import { Pagination } from '../../pagination'
import './gallerypage.css'
import { CDNBlockLink } from '../../cdnBlockLink/CDNBlockLink.tsx'

const GalleryPage = () => {
  const { setIcons, setDeviconBranch, setFilterGroups, setSelectedIcon } = useIconStore()

  useEffect(() => {
    const init = async () => {
      try {
        const params = new URLSearchParams(location.search)
        const branchFromUrl = params.get('branch') as DeviconBranch | null
        const selectedIconName = params.get('icon') ?? null

        const effectiveBranch = branchFromUrl || 'master'

        if (branchFromUrl) {
          setDeviconBranch(branchFromUrl)
        }

        const tempIcons = await fetchIcons(effectiveBranch)

        if (tempIcons) {
          setIcons(tempIcons)
          setFilterGroups(INIT_FILTER_GROUPS.map((group) => populateIconFilters(tempIcons, group)))

          if (selectedIconName) {
            const selected = tempIcons.find((icon) => icon.name === selectedIconName)
            setSelectedIcon(selected || null)
          }
        }
      } catch (err) {
        console.error('Failed to initialize icons:', err)
      }
    }

    init()
  }, [])

  return (
    <>
      <FilterSection />
      <IconModalSection />
      <AboutSection />
      <CDNBlockLink />
      <Pagination />
    </>
  )
}

export default GalleryPage
