import { useEffect, useState } from "react"

import FilterList from "./components/FilterList"
import SearchBar from "../../components/SearchBar"
import { IIconFilter, IIcon, DeviconBranch, IconVersion } from "./types"
import { filterIconsByName, filterIconsByTag, filterIconsByVersion, getIconTagFilters, getIconVersionFilters, updateFilters } from "./helpers/iconFilters"
import IconModal from "./components/modal/IconModal"
import { createDeviconJsonUrl } from "./helpers/iconUrl"
import PaginatedGrid from "./components/pagination/PaginatedGrid"
import { iconVersionMap, initialIconVersionFilters } from "./config"


const IconGallery = () => {


    const [icons, setIcons] = useState<IIcon[]>([])
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])
    const [versionFilters, setVersionFilters] = useState<IIconFilter[]>(initialIconVersionFilters)
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
            setVersionFilters(getIconVersionFilters(fetchedIcons, versionFilters));
            setTagFilters(getIconTagFilters(fetchedIcons, tagFilters));

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
                if (filter.isSelected) filtered = filterIconsByTag(filtered, filter.filterName);
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

            <section className="bg-smoke dark:bg-zinc-800 flex flex-row px-32 py-16  gap-8 ">
                <div className="flex flex-col w-1/6 gap-8">
                    <FilterList title="Icon Style" filters={versionFilters} handleFilter={handleVersionFilter} iconMap={iconVersionMap} />
                    <FilterList title="Icon Tags" filters={tagFilters} handleFilter={handleTagFilter} iconMap={iconVersionMap} limit={10} />
                </div>

                <div className="flex flex-col w-5/6">
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setSelectedIcon} />
                </div>
            </section>

        </>
    )
}

export default IconGallery