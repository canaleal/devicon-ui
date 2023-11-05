import { useState } from "react"
import { SearchBar } from "../../../components/Elements/SearchBar"
import { IIcon, DeviconBranch } from "../../../types"
import { IconModal } from "../modal"
import { PaginatedGrid } from "../pagination"
import { ICON_VERSION_FA_MAP } from "../../../config"
import { Dropdown } from "../../../components/Elements/Dropdown"
import { CodeBlock } from "../../../components/Elements/CodeBlock"
import { DEVICON_LINK_TAG } from "../../../constants"
import { Tooltip } from "../../../components/Elements/Tooltip"
import { IIconFilter, updateFilter, FilterList, IIconFilterGroup, useFilterGroups, useFilteredIcons, resetFilterGroup, updateFilterGroups } from "../filters"
import Modal from "../../../components/Elements/Modal/Modal"
import storage from "../../../helpers/storage"
import { useIcons } from "../../../hooks"
import { copyToClipboard } from "../../../helpers/copyToClipboard"

const GalleryPage = () => {

    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>(storage.getToken().deviconBranch ?? 'master');
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [searchTerm, setSearchTerm] = useState("");

    const icons = useIcons(deviconBranch);
    const { filterGroups, setFilterGroups } = useFilterGroups(icons);
    const filteredIcons = useFilteredIcons(icons, filterGroups, searchTerm);

    const handleBranchChange = (branch: DeviconBranch) => {
        const token = storage.getToken();
        storage.setToken({ ...token, deviconBranch: branch });
        setDeviconBranch(branch);
    }

    const handleFilterClick = (filterGroup: IIconFilterGroup, filter: IIconFilter) => {
        const updatedFilterGroup = updateFilter(filterGroup, filter);
        const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup);
        setFilterGroups(updatedFilterGroups);
    }

    const handleResetFilterGroup = (filterGroup: IIconFilterGroup) => {
        const updatedFilterGroup = resetFilterGroup(filterGroup)
        const updatedFilterGroups = updateFilterGroups(filterGroups, updatedFilterGroup);
        setFilterGroups(updatedFilterGroups);
    }

    return (
        <>
            <Modal isOpen={!!selectedIcon} onClose={() => setSelectedIcon(null)}>
                <IconModal icon={selectedIcon!} deviconBranch={deviconBranch} />
            </Modal>

            <section className="bg-white dark:bg-zinc-900 dark:text-white  px-32 py-8 flex flex-row gap-4 ">
                <p className="text-title my-auto text-green-600 mr-auto">Devicon</p>
                <Dropdown size="lg" selectedOption={deviconBranch} options={["master", "develop"]} onChange={(value) => { handleBranchChange(value as DeviconBranch) }} />
                <SearchBar size="xl" onSearch={setSearchTerm} />
            </section>

            <section className="bg-smoke dark:bg-zinc-800 flex flex-col 2xl:flex-row px-16 2xl:px-32 py-16  gap-8 ">
                <div className="flex flex-col w-6/6 2xl:w-1/6 gap-8">
                    {filterGroups.map(group => (
                        <FilterList
                            key={group.filterType}
                            title={group.groupName}
                            filterGroup={group}
                            handleFilter={(filter) => handleFilterClick(group, filter)}
                            iconMap={ICON_VERSION_FA_MAP}
                            isLimited={group.filters.length > 10}
                            resetFilterGroup={() => handleResetFilterGroup(group)}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-6 w-6/6 2xl:w-5/6">
                    {deviconBranch === 'master' &&
                        <CodeBlock title="Place this in your header (once per HTML file)" code={DEVICON_LINK_TAG}>
                            <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                                <button onClick={() => { copyToClipboard(DEVICON_LINK_TAG) }} title='Copy CDN' className='px-4 py-2 hover:text-green-600 flex ml-auto'>
                                    <p className="font-bold text-sm my-auto">Copy CDN</p>
                                    <i className="fa-solid fa-copy ml-2 my-auto"></i>
                                </button>
                            </Tooltip>
                        </CodeBlock>}
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setSelectedIcon} />
                </div>
            </section>

        </>
    )
}

export default GalleryPage