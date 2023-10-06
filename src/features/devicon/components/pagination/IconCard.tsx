
import { DeviconBranch, IIcon } from "../../types";
import { createDeviconIconUrl } from "../../helpers/iconUrl";

interface IconCardProps {
    icon: IIcon,
    deviconBranch: DeviconBranch
    onSelect : (icon: IIcon) => void
}

const IconCard = ({ icon, deviconBranch, onSelect }: IconCardProps) => {

    const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch);
    return (
        <button onClick={()=>{onSelect(icon)}} aria-label={`Select icon: ${icon.name}`} className="overflow-hidden bg-white dark:bg-zinc-900 dark:hover:text-white  shadow-sm hover:bg-green-500 hover:text-white text-slate-400 flex  flex-col justify-center align-middle h-[10rem] text-center rounded-lg w-full">
            <img className="mx-auto" width={50} height={'auto'} src={iconUrl} alt={icon.name} />
            <p className="text-sm mt-4">{icon.name}</p>
        </button>
    )
}

export default IconCard;