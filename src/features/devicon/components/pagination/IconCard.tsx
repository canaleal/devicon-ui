
import { DeviconBranch, IIcon } from "../../types";
import { createDeviconIconUrl } from "../../helpers/iconUrl";

interface IconCardProps {
    icon: IIcon,
    deviconBranch: DeviconBranch
    onSelect : (icon: IIcon) => void
}

const IconCard = ({ icon, deviconBranch, onSelect }: IconCardProps) => {

    const createIconUrl = () => {
        if (!icon) return;
        const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch);
        return iconUrl;
    }
    return (
        <button onClick={()=>{onSelect(icon)}} aria-label={`Select icon: ${icon.name}`} className="overflow-hidden bg-white shadow-sm hover:bg-green-500 hover:text-white text-slate-400 flex  flex-col justify-center align-middle h-[10rem] text-center rounded-lg w-full">
            <img className="mx-auto" width={50} height={'auto'} src={createIconUrl()} alt={icon.name} />
            <p className="text-sm mt-4">{icon.name}</p>
        </button>
    )
}

export default IconCard;