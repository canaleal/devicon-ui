import { useState } from 'react'
import { SearchBar } from '../../../components/Elements/Form/SearchBar'
import { IIcon, DeviconBranch } from '../../../types'
import { IconModal } from '../modal'
import { Pagination } from '../pagination'
import { Dropdown } from '../../../components/Elements/Form/Dropdown'
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
import { CDNBlockLink } from '../cdnBlock/CDNBlockLink'
import FilterDropdown from '../filters/FilterDropdown'
import InformationSection from '../information/InformationSection'

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
    const url = `${location.origin}${location.pathname}?icon=${icon.name}&branch=${deviconBranch}`
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

      <section className='flex flex-col w-full bg-white dark:bg-dark-900 border-b border-gray-600/20'>
        <div className="mx-auto w-full  py-6 px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[90rem]">
          <div className='flex flex-col xl:flex-row gap-4 justify-between w-full'>
            <div className='flex flex-row gap-4'>
              <Dropdown
                extraClasses='w-full xl:w-32'
                isDisabled={false}
                selectedOption={deviconBranch}
                options={['master', 'develop']}
                onChange={(value) => {
                  handleBranchChange(value as DeviconBranch)
                }}
              />
              <SearchBar
                placeholder='Search Icons'
                extraClasses='w-full xl:w-96'
                onSearch={setSearchTerm}
                autoCompleteOptions={searchAutoCompleteOptions}
              />
            </div>

            <div className='flex flex-row gap-4'>
              <FilterDropdown
                filterGroup={filterGroups[0]}
                handleFilterClick={handleFilterClick}
                handleResetFilterGroup={handleResetFilterGroup}
                extraClasses='w-full xl:w-64'
              />
              <FilterDropdown
                filterGroup={filterGroups[1]}
                handleFilterClick={handleFilterClick}
                handleResetFilterGroup={handleResetFilterGroup}
                extraClasses='w-full xl:w-96'
              />
            </div>
          </div>
        </div>
      </section>


      <section className='flex flex-col w-full bg-gray-50 dark:bg-dark-900'>
        <div className="flex flex-col gap-6 mx-auto w-full py-12 px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[90rem]">
          <CDNBlockLink deviconBranch={deviconBranch} />
          <div className=' z-10  flex flex-col p-8 rounded-2xl bg-white border border-gray-600/20 dark:bg-dark-900 dark:text-white  dark:border-gray-600/20 shadow-md'>
            <Pagination icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setNewSelectedIcon} />
          </div>
        </div>
      </section>

      <InformationSection />

      
    </>
  )
}

export default GalleryPage
