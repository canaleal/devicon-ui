import { useEffect, useState } from "react"

import CategoryList from "./components/CategoryList"
import SearchBar from "./components/SearchBar"
import { getIconCategories } from "./helpers/iconCategories"
import { IVersionStyle, IIcon, initialVersionStyle, DeviconBranch } from "./types"
import { filterIconsByName, filterIconsByVersion } from "./helpers/iconFilters"
import IconModal from "./components/modal/IconModal"
import { createDeviconJsonUrl } from "./helpers/iconUrl"
import PaginatedGrid from "./components/PaginatedGrid"
import { Footer } from "./components/Footer"


const IconGallery = () => {


    const [icons, setIcons] = useState<IIcon[]>([])
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])
    const [versionCategories, setCategories] = useState<IVersionStyle[]>(initialVersionStyle)
    const [searchTerm, setSearchTerm] = useState("");
    const [deviconBranch, setDeviconBranch] = useState<DeviconBranch>("master");

 
    const fetchIcons = async (): Promise<IIcon[]> => {
        const url = createDeviconJsonUrl(deviconBranch);
        const response = await fetch(url);
        const icons: IIcon[] = await response.json();
        return icons;
    }

    useEffect(() => {
        (async () => {
            const icons = await fetchIcons();
            setIcons(icons);
            setFilteredIcons(icons);
            const categories = getIconCategories(icons);
            setCategories(categories);
        })();
    }, [deviconBranch]);

    const handleSelectIcon = (icon: IIcon) => {
        setSelectedIcon(icon);
    }

    const handleDeselectIcon = () => {
        setSelectedIcon(null);
    }

    const handleSearch = (search: string) => {
        const filteredIcons = filterIconsByName(icons, search);
        const categories = getIconCategories(filteredIcons);
        setSearchTerm(search);
        setFilteredIcons(filteredIcons);
        setCategories(categories);
    }

    const handleVersionFilter = (category: IVersionStyle) => {
        const updatedCategories = [...versionCategories];
        const index = updatedCategories.findIndex((c) => c.versionName === category.versionName);
        updatedCategories[index].isSelected = !updatedCategories[index].isSelected;
        setCategories(updatedCategories);
        applyAllFilters(updatedCategories);
    }

    const applyAllFilters = (categories: IVersionStyle[]) => {
        let filtered = [...icons];  
        if (searchTerm) filtered = filterIconsByName(filtered, searchTerm);
        categories.forEach(category => {
            if (category.isSelected) filtered = filterIconsByVersion(filtered, category.versionName);
        });
        setFilteredIcons(filtered);
    }


    return (
        <>

            {selectedIcon && (
                <IconModal icon={selectedIcon} handleClose={handleDeselectIcon} deviconBranch={deviconBranch} />
            )}

            <section className="bg-white px-64 py-8 flex flex-row gap-4">
                <p className="text-title my-auto">Devicon</p>
                <select onChange={(e) => { setDeviconBranch(e.target.value as DeviconBranch) }} className="ml-auto bg-white border rounded-lg px-4 py-2">
                    <option value="master">Master</option>
                    <option value="develop">Develop</option>
                </select>
                <SearchBar onSearch={handleSearch} />

            </section>

            <section className="bg-smoke flex flex-row px-64 py-16  h-fit">
                <div className="flex flex-col w-1/6 gap-4">
                    <CategoryList title="Style" categories={versionCategories} handleFilter={handleVersionFilter} />
                </div>

                <div className="flex flex-col px-4 w-5/6">
                    <PaginatedGrid icons={filteredIcons} deviconBranch={deviconBranch} onSelect={handleSelectIcon}  />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default IconGallery