import { useEffect, useState } from "react"

import FilterList from "../features/filters/FilterList"
import SearchBar from "../components/SearchBar"
import { IIcon, DeviconBranch, IconVersion } from "../types"
import { filterIconsByName, filterIconsByTag, filterIconsByVersion, populateIconFilters, updateFilters } from "../features/filters/helpers/iconFilters"
import IconModal from "../features/modal/IconModal"
import { createDeviconJsonUrl } from "../helpers/iconUrl"
import PaginatedGrid from "../features/gallery/PaginatedGrid"
import { iconVersionMap } from "../config"
import CdnBlock from "../components/cdnBlock/CdnBlock"
import { IIconFilter } from "../features/filters/types/filterTypes"


const IconPage = () => {


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

    return (
        <>
            {selectedIcon && (
                <IconModal icon={selectedIcon} handleClose={() => setSelectedIcon(null)} deviconBranch={deviconBranch} />
            )}

            <section className="bg-white dark:bg-zinc-900 dark:text-white  px-32 py-8 flex flex-row gap-4">
                <p className="text-title my-auto text-green-600">Devicon</p>
                <select onChange={(e) => { setDeviconBranch(e.target.value as DeviconBranch) }} className="ml-auto bg-white dark:bg-zinc-900 border dark:border-zinc-600 rounded-lg px-4 py-2">
                    <option value="master">Master</option>
                    <option value="develop">Develop</option>
                </select>
                <SearchBar onSearch={handleSearch} />

            </section>

            <section className="bg-smoke dark:bg-zinc-800 flex flex-col 2xl:flex-row px-16 2xl:px-32 py-16  gap-8 ">
                <div className="flex flex-col w-6/6 2xl:w-1/6 gap-8">
                    <FilterList title="Icon Style" filters={versionFilters} handleFilter={handleVersionFilter} iconMap={iconVersionMap} />
                    <FilterList title="Icon Tags" filters={tagFilters} handleFilter={handleTagFilter} iconMap={iconVersionMap} limit={10} />

                </div>

                <div className="flex flex-col w-6/6 2xl:w-5/6">
                    <CdnBlock deviconBranch={deviconBranch} />
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setSelectedIcon} />
                </div>
            </section>

        </>
    )
}

export default IconPage