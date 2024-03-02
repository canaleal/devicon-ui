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
import { useDeviconBranch, useIcons, useSelectedIcon } from "../../../hooks"

const GalleryPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const { deviconBranch, setDeviconBranch } = useDeviconBranch();
    const icons = useIcons(deviconBranch);
    const { selectedIcon, setSelectedIcon } = useSelectedIcon(icons);
    const searchedIcons = useFilterBySearchTerm(icons, searchTerm);
    const { filterGroups, setFilterGroups } = useInitializeFilterGroups(searchedIcons);
    const filteredIcons = useApplyFilters(searchedIcons, filterGroups);

    const setNewSelectedIcon = (icon: IIcon) => {
        const urlSafe = icon.name;
        const url = `${location.origin}${location.pathname}?icon=${urlSafe}&branch=${deviconBranch}`;
        window.history.pushState({ icon }, document.title, url);
        setSelectedIcon(icon);
    }

    const setRemoveSelectedIcon = () => {
        const url = `${location.origin}${location.pathname}`;
        window.history.pushState({}, document.title, url);
        setSelectedIcon(null);
    }

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
            <Modal isOpen={!!selectedIcon} onClose={setRemoveSelectedIcon}>
                <IconModal icon={selectedIcon!} deviconBranch={deviconBranch} />
            </Modal>

            <section className="bg-zinc-1000 flex flex-col xl:flex-row px-16 2xl:px-32 py-8  gap-4 justify-end">
                <Dropdown size="lg" selectedOption={deviconBranch} options={["master", "develop"]} onChange={(value) => { handleBranchChange(value as DeviconBranch) }} />
                <SearchBar size="xxxl" onSearch={setSearchTerm} />
            </section>



            <section className="bg-smoke dark:bg-zinc-900 flex flex-col xl:flex-row px-16 2xl:px-32 py-8  gap-6 w-full">
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
                            <p className="bg-indigo-600 px-4 py-2 text-white">Place this in your header (once per HTML file)</p>
                        </CodeBlock>
                    }
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setNewSelectedIcon} />
                </div>
            </section>

        </>
    )
}

export default GalleryPage