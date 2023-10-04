import { useEffect, useState } from "react"

import CategoryList from "./components/CategoryList"
import SearchBar from "./components/SearchBar"

import { IIconFilter, IIcon, DeviconBranch, IconVersion } from "./types"
import { filterIconsByName, filterIconsByVersion, getIconVersionFilters } from "./helpers/iconFilters"
import IconModal from "./components/modal/IconModal"
import { createDeviconJsonUrl } from "./helpers/iconUrl"
import PaginatedGrid from "./components/pagination/PaginatedGrid"
import { Footer } from "./components/Footer"
import ScrollButton from "./components/ScrollButton"
import { iconVersionMap, initialIconVersionFilters } from "./config"


const IconGallery = () => {


    const [icons, setIcons] = useState<IIcon[]>([])
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])
    const [versionFilters, setVersionFilters] = useState<IIconFilter[]>(initialIconVersionFilters)
    const [searchTerm, setSearchTerm] = useState("");
    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>("master");


    const fetchIconsFromBranch = async (): Promise<IIcon[]> => {
        const url = createDeviconJsonUrl(deviconBranch);
        const response = await fetch(url);
        return response.json();
    }
    
    const initializeIconsData = async () => {
        const fetchedIcons = await fetchIconsFromBranch();
        setIcons(fetchedIcons);
        setFilteredIcons(fetchedIcons);
        setVersionFilters(getIconVersionFilters(fetchedIcons));
    }

    useEffect(() => {
        initializeIconsData();
    }, [deviconBranch]);


    const handleSearch = (search: string) => {
        const filtered = filterIconsByName(icons, search);
        setSearchTerm(search);
        setFilteredIcons(filtered);
        setVersionFilters(getIconVersionFilters(filtered));
    }

    const handleVersionFilter = (category: IIconFilter) => {
        const updatedCategories = [...versionFilters];
        const index = updatedCategories.findIndex((c) => c.categoryName === category.categoryName);
        updatedCategories[index].isSelected = !updatedCategories[index].isSelected;
        setVersionFilters(updatedCategories);
        applyAllFilters(updatedCategories);
    }

    const applyAllFilters = (categories: IIconFilter[]) => {
        let filtered = searchTerm ? filterIconsByName(icons, searchTerm) : icons;
        categories.forEach(category => {
            if (category.isSelected) filtered = filterIconsByVersion(filtered, category.categoryName as IconVersion);
        });
        setFilteredIcons(filtered);
    }


    return (
        <>
            <ScrollButton />

            {selectedIcon && (
                <IconModal icon={selectedIcon} handleClose={() => setSelectedIcon(null)} deviconBranch={deviconBranch} />
            )}

            <section className="bg-white px-64 py-8 flex flex-row gap-4">
                <p className="text-title my-auto">Devicon</p>
                <select onChange={(e) => { setDeviconBranch(e.target.value as DeviconBranch) }} className="ml-auto bg-white border rounded-lg px-4 py-2">
                    <option value="master">Master</option>
                    <option value="develop">Develop</option>
                </select>
                <SearchBar onSearch={handleSearch} />

            </section>

            <section className="bg-smoke flex flex-row px-64 py-16  gap-8 h-fit">
                <div className="flex flex-col w-1/6 gap-4">
                    <CategoryList title="Icon Style" categories={versionFilters} handleFilter={handleVersionFilter} iconMap={iconVersionMap} />
                 
                </div>

                <div className="flex flex-col w-5/6">
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={setSelectedIcon} />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default IconGallery