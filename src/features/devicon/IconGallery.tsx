import { useEffect, useState } from "react"

import CategoryList from "./components/CategoryList"
import IconCard from "./components/IconCard"
import SearchBar from "./components/SearchBar"
import { getIconCategories } from "./helpers/iconCategories"
import { IVersionStyle, IIcon } from "./types"
import { filterIconsByName, filterIconsByVersion } from "./helpers/iconFilters"
import IconModal from "./components/IconModal"


const IconGallery = () => {


    const [icons, setIcons] = useState<IIcon[]>([])
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null)
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])
    const [versionCategories, setCategories] = useState<IVersionStyle[]>([
        { versionName: 'original', numberOfIcons: 0, isSelected: false },
        { versionName: 'plain', numberOfIcons: 0, isSelected: false },
        { versionName: 'line', numberOfIcons: 0, isSelected: false },
        { versionName: 'original-wordmark', numberOfIcons: 0, isSelected: false },
        { versionName: 'plain-wordmark', numberOfIcons: 0, isSelected: false },
        { versionName: 'line-wordmark', numberOfIcons: 0, isSelected: false },
    ])
    const [searchTerm, setSearchTerm] = useState("");

    const fetchIcons = async (): Promise<IIcon[]> => {
        const response = await fetch('https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json');
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
    }, []);

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

        // Apply search filter
        if (searchTerm) {
            filtered = filterIconsByName(filtered, searchTerm);
        }

        for (const category of categories) {
            if (category.isSelected) {
                filtered = filterIconsByVersion(filtered, category.versionName);
            }
        }

        setFilteredIcons(filtered);
    }



    return (
        <>

            {selectedIcon && (
                <IconModal icon={selectedIcon} handleClose={handleDeselectIcon} />
            )}

            <section className="bg-white px-64 py-8 flex flex-row">
                <SearchBar onSearch={handleSearch} />
            </section>

            <section className="bg-smoke flex flex-row px-64 py-8  min-h-screen">
                <div className="flex flex-col w-1/6 gap-4">
                    <CategoryList title="Style" categories={versionCategories} handleFilter={handleVersionFilter} />
                </div>

                <div className="flex flex-col px-4 w-5/6">
                    <div className="flex w-full  mb-6 justify-between">
                        <p className="font-bold text-xl my-auto">{filteredIcons.length} Icons</p>

                    </div>
                    <div className="grid xl:grid-cols-6 gap-4">
                        {filteredIcons.map((icon: IIcon) => (
                            <IconCard key={icon.name} icon={icon} onSelect={handleSelectIcon} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default IconGallery