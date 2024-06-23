import { useState } from 'react'
import { SearchBar } from '../../../components/Elements/SearchBar'
import { IIcon, DeviconBranch } from '../../../types'
import { IconModal } from '../modal'
import { PaginatedGrid } from '../pagination'

import { Dropdown } from '../../../components/Form/Dropdown'

import {
  IFilterItem,
  updateFilter,

  IFilterGroup,
  useInitializeFilterGroups,
  useApplyFilters,
  resetFilterGroup,
  updateFilterGroups,
  useFilterBySearchTerm
} from '../filters'
import Modal from '../../../components/Elements/Modal/Modal'
import storage from '../../../helpers/storage'
import { useDeviconBranch, useIcons, useSelectedIcon } from '../../../hooks'
import { CodeBlockLink } from '../code/CodeBlockLink'
import Filters from '../filters/Filters'
import DeviconLogo from '../../../components/Elements/DeviconLogo/DeviconLogo'

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { deviconBranch, setDeviconBranch } = useDeviconBranch()
  const icons = useIcons(deviconBranch)
  const { selectedIcon, setSelectedIcon } = useSelectedIcon(icons)
  const searchedIcons = useFilterBySearchTerm(icons, searchTerm)
  const { filterGroups, setFilterGroups } = useInitializeFilterGroups(searchedIcons)
  const filteredIcons = useApplyFilters(searchedIcons, filterGroups)

  const setNewSelectedIcon = (icon: IIcon) => {
    const urlSafe = icon.name
    const url = `${location.origin}${location.pathname}?icon=${urlSafe}&branch=${deviconBranch}`
    window.history.pushState({ icon }, document.title, url)
    setSelectedIcon(icon)
  }

  const setRemoveSelectedIcon = () => {
    const url = `${location.origin}${location.pathname}`
    window.history.pushState({}, document.title, url)
    setSelectedIcon(null)
  }

  const handleBranchChange = (branch: DeviconBranch) => {
    const token = storage.getToken()
    storage.setToken({ ...token, deviconBranch: branch })
    setDeviconBranch(branch)
  }

  const handleFilterClick = (filterGroup: IFilterGroup, filter: IFilterItem) => {
    const updatedFilterGroup = updateFilter(filterGroup, filter)
    const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup)
    setFilterGroups(updatedFilterGroups)
  }

  const handleResetFilterGroup = (filterGroup: IFilterGroup) => {
    const updatedFilterGroup = resetFilterGroup(filterGroup)
    const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup)
    setFilterGroups(updatedFilterGroups)
  }

  return (
    <>
      <Modal isOpen={!!selectedIcon} onClose={setRemoveSelectedIcon}>
        <IconModal icon={selectedIcon!} deviconBranch={deviconBranch} />
      </Modal>

      <section className='flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-4  gap-4  w-full border-b'>
        <DeviconLogo />
        <div className='flex flex-col md:flex-row gap-4'>
          <Dropdown
            size='full'
            selectedOption={deviconBranch}
            options={['master', 'develop']}
            onChange={(value) => {
              handleBranchChange(value as DeviconBranch)
            }}
          />
          <SearchBar size='full' onSearch={setSearchTerm} />
        </div>
      </section>

      <section className='flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-8  gap-4 w-full'>
        <div className='w-6/6 xl:w-1/6'>
          <Filters filterGroups={filterGroups} handleFilterClick={handleFilterClick} handleResetFilterGroup={handleResetFilterGroup} />
        </div>
        <div className='w-6/6 xl:w-5/6 flex flex-col gap-4'>
          <CodeBlockLink deviconBranch={deviconBranch} />

          <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setNewSelectedIcon} />
        </div>
      </section>
    </>
  )
}

export default GalleryPage
