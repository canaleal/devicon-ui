import { IIcon } from "../types"

interface IconCardProps {
    imageBaseUrl: string
    icon: IIcon
}

const IconCard = ({ imageBaseUrl, icon }: IconCardProps) => {
    return (
        <button className="bg-gray-50 hover:bg-green-400 col-span-1 flex  flex-col  gap-8 p-8 text-center rounded-lg ">
            <img className="mx-auto" width={100} height={'auto'} src={`${imageBaseUrl}/${icon.name}/${icon.name}-${icon.versions.svg[0]}.svg`} alt={icon.name} />
            <p>{icon.name}</p>
        </button>
    )
}

export default IconCard;