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

import FilterDropdown from '../filters/FilterDropdown'

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

      <section className='flex flex-col px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-16 lg:py-16 gap-4 w-full bg-smoke-100 dark:bg-dark-700 dark:text-white'>
        <CodeBlockLink deviconBranch={deviconBranch} />
        <div className='flex flex-col  items-center bg-white dark:bg-dark-900 border dark:border-dark-400 shadow-md rounded-lg w-full'>
          <div className='flex flex-row gap-4 px-8 py-6 border-b dark:border-dark-400  w-full'>
            <Dropdown
              extraClasses='w-96'
              isDisabled={false}
              selectedOption={deviconBranch}
              options={['master', 'develop']}
              onChange={(value) => {
                handleBranchChange(value as DeviconBranch)
              }}
            />
            <SearchBar placeholder='Search Icons' extraClasses='w-full' onSearch={setSearchTerm} autoCompleteOptions={searchAutoCompleteOptions} />

            <FilterDropdown
              filterGroup={filterGroups[0]}
              handleFilterClick={handleFilterClick}
              handleResetFilterGroup={handleResetFilterGroup}
              extraClasses='w-96'

            />
            <FilterDropdown
              filterGroup={filterGroups[1]}
              handleFilterClick={handleFilterClick}
              handleResetFilterGroup={handleResetFilterGroup}
              extraClasses='w-96'
            />
          </div>

          <div className='px-8 py-6 w-full'>
            <Pagination icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setNewSelectedIcon} />
          </div>
        </div>
      </section>
    </>
  )
}

export default GalleryPage
