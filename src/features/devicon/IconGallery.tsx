import { useEffect, useState } from "react"
import { IIcon, IVersion, Version } from "./types"
import IconCard from "./components/IconCard"

const IconGallery = () => {

    const [icons, setIcons] = useState<IIcon[]>([])
    const [filteredIcons, setFilteredIcons] = useState<IIcon[]>([])



    const [categories, setCategories] = useState<IVersion[]>([
        { versionType: 'original', numberOfIcons: 0 },
        { versionType: 'plain', numberOfIcons: 0 },
        { versionType: 'line', numberOfIcons: 0 },
        { versionType: 'original-wordmark', numberOfIcons: 0 },
        { versionType: 'plain-wordmark', numberOfIcons: 0 },
        { versionType: 'line-wordmark', numberOfIcons: 0 },
    ])

    //get icons from api
    const getIcons = async () => {
        const response = await fetch('https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json')
        const data: IIcon[] = await response.json()

        // iterate through all icon version svg arrays and if the value does not exist add it to the array otherwise add 1 to the value
        const categories: IVersion[] = []
        data.forEach((icon: IIcon) => {
            icon.versions.svg.forEach((version: string) => {
                const category = categories.find(category => category.versionType === version)
                if (category) {
                    category.numberOfIcons++
                } else {
                    categories.push({ versionType: version as Version, numberOfIcons: 1 })
                }
            })
        })


        setCategories(categories)
        setIcons(data)
        setFilteredIcons(data)
    }



    const searchFilterIcons = (search: string) => {
        const filteredIcons = icons.filter(icon => icon.name.toLowerCase().includes(search.toLowerCase()))
        // iterate through all icon version svg arrays and if the value does not exist add it to the array otherwise add 1 to the value
        const categories: IVersion[] = []
        filteredIcons.forEach((icon: IIcon) => {
            icon.versions.svg.forEach((version: string) => {
                const category = categories.find(category => category.versionType === version)
                if (category) {
                    category.numberOfIcons++
                } else {
                    categories.push({ versionType: version as Version, numberOfIcons: 1 })
                }
            })
        })
        setCategories(categories)
        setFilteredIcons(filteredIcons)
    }


    useEffect(() => {
        getIcons()
    }, [])



    const ICON_URL_BASE = 'https://raw.githubusercontent.com/devicons/devicon/develop/icons'

    return (
        <>
            <section className="bg-white px-64 py-8">


                <div className="flex flex-row justify-end items-center w-full">
                    <div className="flex flex-row  gap-4">


                        <input className="border w-96 border-gray-300 px-4 py-2 rounded-lg" type="text" placeholder="Search Icons..." onChange={(e) => searchFilterIcons(e.target.value)} />

                    </div>

                </div>

            </section>

            <section className="main bg-smoke flex flex-row py-8 px-64 min-h-screen">

                <div className="flex flex-col gap-2 px-4 w-1/6">
                    <p className="font-bold ">Style</p>
                    {categories.map(category => (
                        <button className="hover:bg-white hover:shadow-sm rounded-lg  flex justify-between px-4 py-2">
                            <p >{category.versionType}</p>
                            <p >{category.numberOfIcons}</p>
                        </button>
                    ))}
                </div>


                <div className="flex flex-col px-4 w-5/6">
                    <div className="flex align-middle mb-6">
                        <p className="font-bold text-xl my-auto">{filteredIcons.length} Icons</p>

                    </div>
                    <div className="grid   grid-cols-6 gap-4">
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