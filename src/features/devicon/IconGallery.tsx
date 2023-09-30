import { useEffect, useState } from "react"
import { IIcon } from "./types"
import IconCard from "./components/IconCard"

const IconGallery = () => {

    const [icons, setIcons] = useState<IIcon[]>([])

    //get icons from api
    const getIcons = async () => {
        const response = await fetch('https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json')
        const data: IIcon[] = await response.json()
        setIcons(data)
    }

    useEffect(() => {
        getIcons()
    }, [])

    const ICON_URL_BASE = 'https://raw.githubusercontent.com/devicons/devicon/develop/icons'

    return (
        <section className="main bg-zinc-700 p-16 ">

            <div className="flex justify-between mb-8 text-white">
                <p className="font-bold text-xl">{icons.length} Icons</p>
            </div>


            <div className="grid  grid-cols-8 gap-8">
                {icons.map((icon: IIcon) => (
                   <IconCard key={icon.name} icon={icon} imageBaseUrl={ICON_URL_BASE} />
                ))}
            </div>


        </section>
    )
}

export default IconGallery