import { useState } from "react"
import { SearchBar } from "../../../components/Elements/SearchBar"
import { IIcon, DeviconBranch } from "../../../types"
import { IconModal } from "../modal"
import { PaginatedGrid } from "../pagination"
import { ICON_VERSION_FA_MAP } from "../../../config"
import { Dropdown } from "../../../components/Form/Dropdown"
import { CodeBlock } from "../../../components/Elements/CodeBlock"
import { DEVICON_LINK_TAG } from "../../../constants"

import { IIconFilterOption, updateFilter, FilterList, IIconFilterCategory, useInitializeFilterGroups, useApplyFilters, resetFilterGroup, updateFilterGroups, useFilterBySearchTerm } from "../filters"
import Modal from "../../../components/Elements/Modal/Modal"
import storage from "../../../helpers/storage"
import { useIcons } from "../../../hooks"

const GalleryPage = () => {

    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>(storage.getToken().deviconBranch ?? 'master');
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [searchTerm, setSearchTerm] = useState("");

    const icons = useIcons(deviconBranch);
    const searchedIcons = useFilterBySearchTerm(icons, searchTerm);
    const { filterGroups, setFilterGroups } = useInitializeFilterGroups(searchedIcons);
    const filteredIcons = useApplyFilters(searchedIcons, filterGroups);

    const handleBranchChange = (branch: DeviconBranch) => {
        const token = storage.getToken();
        storage.setToken({ ...token, deviconBranch: branch });
        setDeviconBranch(branch);
    }

    const handleFilterClick = (filterGroup: IIconFilterCategory, filter: IIconFilterOption) => {
        const updatedFilterGroup = updateFilter(filterGroup, filter);
        const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup);
        setFilterGroups(updatedFilterGroups);
    }

    const handleResetFilterGroup = (filterGroup: IIconFilterCategory) => {
        const updatedFilterGroup = resetFilterGroup(filterGroup)
        const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup);
        setFilterGroups(updatedFilterGroups);
    }

    return (
        <>
            <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}>
                <IconModal icon={selectedIcon!} deviconBranch={deviconBranch} />
            </Modal>

            <section className="bg-smoke dark:bg-zinc-1000 dark:text-white  px-32 py-8 flex flex-row gap-4 ">
                <p className="text-title my-auto text-primary mr-auto">Devicon</p>
                <Dropdown size="lg" selectedOption={deviconBranch} options={["master", "develop"]} onChange={(value) => { handleBranchChange(value as DeviconBranch) }} />
                <SearchBar size="xl" onSearch={setSearchTerm} />
            </section>

            <section className="bg-white dark:bg-zinc-900 flex flex-col xl:flex-row px-16 2xl:px-32 py-16  gap-6 w-full">
                <div className="w-6/6 xl:w-1/6 flex flex-col gap-6">
                    {filterGroups.map(group => (
                        <FilterList
                            key={group.filterType}
                            filterGroup={group}
                            handleFilter={handleFilterClick}
                            iconMap={ICON_VERSION_FA_MAP}
                            hasMaxHeight={group.filters.length > 10}
                            resetFilterGroup={handleResetFilterGroup}
                        />
                    ))}
                </div>
                <div className="w-6/6 xl:w-5/6 flex flex-col gap-6">
                    {deviconBranch === 'master' &&
                        <CodeBlock code={DEVICON_LINK_TAG}>
                            <p className="bg-primary px-4 py-2 text-white">Place this in your header (once per HTML file)</p>
                        </CodeBlock>
                    }
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setSelectedIcon} />
                </div>
            </section>

        </>
    )
}

export default GalleryPage