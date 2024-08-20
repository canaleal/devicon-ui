import { useEffect, useState } from 'react'
import { SearchBar } from '../../../components/Elements/Form/SearchBar'
import { DeviconBranch, IconVersion, IIcon } from '../../../types'
import { IconModal } from '../modal'
import { Pagination } from '../pagination'
import { Dropdown } from '../../../components/Elements/Form/Dropdown'
import {
  IFilterItem,
  updateFilter,
  IFilterGroup,
  resetFilterGroup,
  updateFilterGroups,
  filterIcons,
  populateIconFilters,
  INIT_FILTER_GROUPS
} from '../filters'
import Modal from '../../../components/Elements/Modal/Modal'

import { CDNBlockLink } from '../cdnBlock/CDNBlockLink'
import FilterDropdown from '../filters/FilterDropdown'
import InformationSection from '../information/InformationSection'
import useIconStore from '../../../store/iconStore'

import '../../../components/Layout/Container/container.css'
import storage from '../../../helpers/storage'
import { fetchIcons } from '../../../service/icons'

const GalleryPage = () => {

  const {
    icons,
    filteredIcons,
    selectedIcon,
    deviconBranch,
    setSelectedIcon,
    setDeviconBranch,
    setFilteredIcons,
    setIcons
  } = useIconStore()

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterGroups, setFilterGroups] = useState<IFilterGroup[]>([]);

  const handleIconsUpdate = (tempIcons: IIcon[], search: string, tempFilterGroups: IFilterGroup[]) => {
    const searchedIconsTemp = search ? filterIcons(tempIcons, 'name', search) : tempIcons;
    let tempFilteredIcons: IIcon[] = searchedIconsTemp;
    tempFilterGroups.forEach((group) => {
      group.filters.forEach((filter) => {
        if (filter.isSelected) {
          tempFilteredIcons = filterIcons(tempFilteredIcons, group.filterType, filter.filterName as IconVersion)
        }
      })
    })
    setFilteredIcons(tempFilteredIcons)
  }

  useEffect(() => {
   
    const init = async () => {
      console.log('init')
      const params = new URLSearchParams(location.search);
      const branch = params.get('branch') as DeviconBranch || storage.getToken().deviconBranch || deviconBranch;
      const tempIcons = await fetchIcons(branch);
      const initFilterGroups = INIT_FILTER_GROUPS.map((group) => populateIconFilters(tempIcons, group))
      setIcons(tempIcons)
      setDeviconBranch(branch);
      setFilterGroups( initFilterGroups)
      handleIconsUpdate(tempIcons, searchQuery, initFilterGroups);
    }

    init()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    handleIconsUpdate(icons, searchQuery, filterGroups);
  }

  const handleDeviconBranchChange = async (branch: DeviconBranch) => {
    setDeviconBranch(branch)
    const tempIcons = await fetchIcons(branch);
    setIcons(tempIcons)
    handleIconsUpdate(tempIcons, searchQuery, filterGroups);
  }

  const handleFilterClick = (filterGroup: IFilterGroup, filter: IFilterItem) => {
    const updatedFilterGroups = updateFilterGroups(filterGroups, updateFilter(filterGroup, filter))
    setFilterGroups(updatedFilterGroups)
    handleIconsUpdate(icons, searchQuery, updatedFilterGroups);
  }

  const handleResetFilterGroup = (filterGroup: IFilterGroup) => {
    const updatedFilterGroups = updateFilterGroups(filterGroups, resetFilterGroup(filterGroup))
    setFilterGroups(updatedFilterGroups)
    handleIconsUpdate(icons, searchQuery, updatedFilterGroups);
  }

  return (
    <>
      <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}>
        <IconModal icon={selectedIcon!} deviconBranch={deviconBranch} />
      </Modal>

      <InformationSection />

      <section className='bg-white dark:bg-dark-900 border-b border-gray-600/20'>
        <div className='base-container xl:flex-row justify-between '>
            <div className='flex flex-row gap-4'>
              <Dropdown
                extraClasses='w-full xl:w-32'
                isDisabled={false}
                selectedOption={deviconBranch}
                options={['master', 'develop']}
                onChange={(value) => {
                  handleDeviconBranchChange(value as DeviconBranch)
                }}
              />
              <SearchBar
                placeholder='Search Icons'
                extraClasses='w-full xl:w-96'
                onSearch={handleSearch}
                autoCompleteOptions={icons.map((icon) => [icon.name, ...icon.altnames]).flat()}
              />
            </div>

            <div className='flex flex-row gap-4'>

              {filterGroups.map((filterGroup) => (
                <FilterDropdown
                  key={filterGroup.categoryName}
                  filterGroup={filterGroup}
                  handleFilterClick={handleFilterClick}
                  handleResetFilterGroup={handleResetFilterGroup}
                  extraClasses='w-full xl:w-64'
                />
              ))}

            </div>
         
        </div>
      </section>

      <section className='bg-gray-50 dark:bg-dark-900'>
        <div className='base-container flex-col'>
          <CDNBlockLink />
          <div className='base-container__card'>
            <Pagination filteredIcons={filteredIcons} />
          </div>
        </div>
      </section>


    </>
  )
}

export default GalleryPage
