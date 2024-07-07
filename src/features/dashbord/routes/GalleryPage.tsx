import { useState } from 'react'
import { SearchBar } from '../../../components/Elements/SearchBar'
import { IIcon, DeviconBranch } from '../../../types'
import { IconModal } from '../modal'
import { Pagination } from '../pagination'

import { Dropdown } from '../../../components/Elements/Dropdown'

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

import FilterDropdown from '../filters/Filters'

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { deviconBranch, setDeviconBranch } = useDeviconBranch()
  const icons = useIcons(deviconBranch)
  const searchAutoCompleteOptions = icons.map((icon) => [icon.name, ...icon.altnames]).flat()
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

      <section className='flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-4 gap-4 w-full border-b border-dark-600 bg-dark-800'>
        <FilterDropdown
          filterGroups={filterGroups}
          handleFilterClick={handleFilterClick}
          handleResetFilterGroup={handleResetFilterGroup}
          size='xl'
        />
        <div className='flex-1 flex flex-col md:flex-row gap-4 justify-end'>
          <Dropdown
            size='lg'
            selectedOption={deviconBranch}
            options={['master', 'develop']}
            onChange={(value) => {
              handleBranchChange(value as DeviconBranch)
            }}
          />
          <SearchBar size='xl' onSearch={setSearchTerm} autoCompleteOptions={searchAutoCompleteOptions} />
        </div>
      </section>

      <section className='flex flex-col px-8 md:px-12 lg:px-24 py-8 gap-4 w-full dark:bg-dark-700 dark:text-smoke-100'>
        <CodeBlockLink deviconBranch={deviconBranch} />
        <Pagination icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setNewSelectedIcon} />
      </section>
    </>
  )
}

export default GalleryPage
