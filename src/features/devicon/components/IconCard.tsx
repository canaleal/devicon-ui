
import { IIcon } from "../types";
import { DEVICON_IMAGE_URL_BASE } from '../constants';

interface IconCardProps {
    icon: IIcon,
    onSelect : (icon: IIcon) => void
}

const IconCard = ({ icon, onSelect }: IconCardProps) => {

    const createIconUrl = () => {
        if (!icon) return;
        const iconUrl = `${DEVICON_IMAGE_URL_BASE}/${icon.name}/${icon.name}-${icon.versions.svg[0]}.svg`
        return iconUrl;
    }
    return (
        <button onClick={()=>{onSelect(icon)}} aria-label={`Select icon: ${icon.name}`} className="bg-white shadow-sm hover:bg-green-500 hover:text-white text-slate-400 flex  flex-col p-8 text-center rounded-lg w-full">
            <img className="mx-auto" width={50} height={'auto'} src={createIconUrl()} alt={icon.name} />
            <p className="text-sm mt-4">{icon.name}</p>
        </button>
    )
}

export default IconCard;