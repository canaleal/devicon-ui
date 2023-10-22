import { useEffect, useState } from "react"
import { SearchBar } from "../../../components/Elements/SearchBar"
import { IIcon, DeviconBranch, IconVersion } from "../../../types"
import { IconModal } from "../modal"
import { createDeviconJsonUrl } from "../../../helpers/iconUrl"
import { PaginatedGrid } from "../pagination"
import { iconVersionMap } from "../../../config"
import { Dropdown } from "../../../components/Elements/Dropdown"
import { CodeBlock } from "../../../components/Elements/CodeBlock"
import { DEVICON_LINK_TAG } from "../../../constants"
import { Tooltip } from "../../../components/Elements/Tooltip"
import { IIconFilter, populateIconFilters, updateFilters, filterIconsByName, filterIconsByVersion, filterIconsByTag, FilterList } from "../filters"
import Modal from "../../../components/Layout/Modal"



const GalleryPage = () => {


    const [icons, setIcons] = useState<IIcon[]>([])
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])
    const [versionFilters, setVersionFilters] = useState<IIconFilter[]>([])
    const [tagFilters, setTagFilters] = useState<IIconFilter[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>("master");

    useEffect(() => {
        const fetchIconsFromBranch = async (): Promise<IIcon[]> => {
            const url = createDeviconJsonUrl(deviconBranch);
            const response = await fetch(url);
            return response.json();
        }

        const initializeIconsData = async () => {
            const fetchedIcons = await fetchIconsFromBranch();
            setIcons(fetchedIcons);
            setFilteredIcons(fetchedIcons);
            setVersionFilters(populateIconFilters(fetchedIcons, versionFilters, 'versions.svg'));
            setTagFilters(populateIconFilters(fetchedIcons, tagFilters, 'tags'));

        }
        initializeIconsData();
    }, [deviconBranch]);


    const handleSearch = (search: string) => {
        setSearchTerm(search);
    }


    const handleVersionFilter = (category: IIconFilter) => {
        setVersionFilters(updateFilters(versionFilters, category));
    }

    const handleTagFilter = (category: IIconFilter) => {
        setTagFilters(updateFilters(tagFilters, category));
    }


    useEffect(() => {
        const applyAllFilters = () => {
            let filtered = searchTerm ? filterIconsByName(icons, searchTerm) : icons;
            versionFilters.forEach(filter => {
                if (filter.isSelected) filtered = filterIconsByVersion(filtered, filter.filterName as IconVersion);
            });

            tagFilters.forEach(filter => {
                if (filter.isSelected) filtered = filterIconsByTag(filtered, filter.filterName as string);
            });
            setFilteredIcons(filtered);
        }
        applyAllFilters();
    }, [versionFilters, tagFilters, searchTerm]);

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
                <Dropdown size="lg" selectedOption={deviconBranch} options={["master", "develop"]} onChange={(value) => { setDeviconBranch(value as DeviconBranch) }} />
                <SearchBar size="xl" onSearch={handleSearch} />
            </section>

            <section className="bg-smoke dark:bg-zinc-800 flex flex-col 2xl:flex-row px-16 2xl:px-32 py-16  gap-8 ">
                <div className="flex flex-col w-6/6 2xl:w-1/6 gap-8">
                    <FilterList title="Icon Style" filters={versionFilters} handleFilter={handleVersionFilter} iconMap={iconVersionMap} />
                    <FilterList title="Icon Tags" filters={tagFilters} handleFilter={handleTagFilter} iconMap={iconVersionMap} limit={10} />
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