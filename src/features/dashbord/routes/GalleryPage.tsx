import { useState } from "react"
import { SearchBar } from "../../../components/Elements/SearchBar"
import { IIcon, DeviconBranch } from "../../../types"
import { IconModal } from "../modal"
import { PaginatedGrid } from "../pagination"
import { iconVersionMap } from "../../../config"
import { Dropdown } from "../../../components/Elements/Dropdown"
import { CodeBlock } from "../../../components/Elements/CodeBlock"
import { DEVICON_LINK_TAG } from "../../../constants"
import { Tooltip } from "../../../components/Elements/Tooltip"
import { IIconFilter, updateFilter, FilterList, IIconFilterGroup } from "../filters"
import Modal from "../../../components/Layout/Modal"
import storage from "../../../helpers/storage"
import { useFetchIcons } from "../../../hooks"
import { useFilterGroups, useFilteredIcons } from "../filters/hooks"

const GalleryPage = () => {

    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>(storage.getToken().deviconBranch ?? 'master');
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [searchTerm, setSearchTerm] = useState("");

    const icons = useFetchIcons(deviconBranch);
    const { filterGroups, setFilterGroups } = useFilterGroups(icons);
    const filteredIcons = useFilteredIcons(icons, filterGroups, searchTerm);

    const handleBranchChange = (branch: DeviconBranch) => {
        const token = storage.getToken();
        storage.setToken({ ...token, deviconBranch: branch });
        setDeviconBranch(branch);
    }

    const handleFilter = (filterGroup: IIconFilterGroup, filter: IIconFilter) => {
        const updatedFilterGroup = updateFilter(filterGroup, filter);
        const updatedFilterGroups = filterGroups.map(group => group.filterType === updatedFilterGroup.filterType ? updatedFilterGroup : group);
        setFilterGroups(updatedFilterGroups);
    }

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
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
                            handleFilter={(filter) => handleFilter(group, filter)}
                            iconMap={iconVersionMap}
                            isLimited={group.filters.length > 10}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-6 w-6/6 2xl:w-5/6">
                    {deviconBranch === 'master' &&
                        <CodeBlock title="Place this in your header (once per HTML file)" code={DEVICON_LINK_TAG}>
                            <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                                <button onClick={() => { copyText(DEVICON_LINK_TAG) }} title='Copy Code' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                                    <p className="font-bold text-sm my-auto">Copy Code</p>
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