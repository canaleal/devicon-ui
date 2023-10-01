import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CategoryList from "./components/CategoryList"
import IconCard from "./components/IconCard"
import Modal from "./components/IconModal"
import SearchBar from "./components/SearchBar"
import { ICON_URL_BASE } from "./constants"
import { getIconVersionCategories } from "./helpers/iconCategories"
import { resetSelectedIcon } from './iconSlice'
import { ICategory, IIcon } from "./types"

const IconGallery = () => {

    const [icons, setIcons] = useState<IIcon[]>([])
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])



    const [versionCategories, setCategories] = useState<ICategory[]>([
        { versionType: 'original', numberOfIcons: 0 },
        { versionType: 'plain', numberOfIcons: 0 },
        { versionType: 'line', numberOfIcons: 0 },
        { versionType: 'original-wordmark', numberOfIcons: 0 },
        { versionType: 'plain-wordmark', numberOfIcons: 0 },
        { versionType: 'line-wordmark', numberOfIcons: 0 },
    ])



    const getIcons = async () => {
        const response = await fetch('https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json')
        const data: IIcon[] = await response.json()
        const categories = getIconVersionCategories(data);

        setCategories(categories)

        setIcons(data)
        setFilteredIcons(data)
    }



    const searchFilterIcons = (search: string) => {
        const filteredIcons = icons.filter(icon => icon.name.toLowerCase().includes(search.toLowerCase()))
        const categories = getIconVersionCategories(filteredIcons);
        setCategories(categories)
        setFilteredIcons(filteredIcons)
    }


    useEffect(() => {
        getIcons()
    }, [])




    const [isModalOpen, setModalOpen] = useState(false);


    const dispatch = useDispatch();

    const selectedIcon = useSelector((state: RootState) => state.icon.selectedIcon);
    useEffect(() => {
        if (selectedIcon) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
            dispatch(resetSelectedIcon())
        }
    }, [selectedIcon])


    return (
        <>
            {selectedIcon && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <div className="flex flex-row gap-4">
                        <img width={100} height={'auto'} src={`${ICON_URL_BASE}/${selectedIcon.name}/${selectedIcon.name}-${selectedIcon.versions.svg[0]}.svg`} alt={selectedIcon.name} />

                        <div className="flex flex-col gap-2">
                            <p className="text-subtitle">{selectedIcon.name}</p>
                            <p>{selectedIcon.tags}</p>

                            <p>{selectedIcon.versions.svg}</p>
                        </div>

                    </div>
                </Modal>
            )}

            <section className="bg-white px-64 py-8 flex flex-row">
                <div className="flex flex-row justify-center items-center w-full">
                    <SearchBar onSearch={searchFilterIcons} />
                </div>
            </section>

            <section className="main bg-smoke flex flex-row py-8 px-64 min-h-screen">

                <div className="flex flex-col w-1/6 gap-4">
                    <CategoryList title="Style" categories={versionCategories} />
                </div>


                <div className="flex flex-col px-4 w-5/6">
                    <div className="flex w-full justify-between mb-6">
                        <p className="font-bold text-xl my-auto">{filteredIcons.length} Icons</p>
                    </div>
                    <div className="grid  xl:grid-cols-8 gap-4">
                        {filteredIcons.map((icon: IIcon) => (
                            <IconCard key={icon.name} icon={icon} imageBaseUrl={ICON_URL_BASE} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default IconGallery