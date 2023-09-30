import { IIcon } from "../types"

interface IconCardProps {
    imageBaseUrl: string
    icon: IIcon
}

const IconCard = ({ imageBaseUrl, icon }: IconCardProps) => {
    return (
        <div className="bg-white shadow-sm hover:bg-green-400 hover:text-white text-slate-400  col-span-1 flex  flex-col  gap-4 p-8 text-center rounded-lg w-full">
            <img className="mx-auto" width={50} height={'auto'} src={`${imageBaseUrl}/${icon.name}/${icon.name}-${icon.versions.svg[0]}.svg`} alt={icon.name} />
            <p className="text-wrap">{icon.name}</p>
        </div>
    )
}

export default IconCard;