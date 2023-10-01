import { useDispatch } from 'react-redux';
import { selectIcon } from '../iconSlice';
import { IIcon } from "../types";

interface IconCardProps {
    imageBaseUrl?: string
    icon: IIcon
}

const IconCard = ({ imageBaseUrl, icon }: IconCardProps) => {

    const dispatch = useDispatch();

    const handleIconClick = () => {
        dispatch(selectIcon(icon))
    }

    return (
        <button onClick={handleIconClick} className="bg-white shadow-sm hover:bg-green-500 hover:text-white text-slate-400 flex  flex-col p-8 text-center rounded-lg w-full">
            <img className="mx-auto" width={50} height={'auto'} src={`${imageBaseUrl}/${icon.name}/${icon.name}-${icon.versions.svg[0]}.svg`} alt={icon.name} />
            <p className="text-sm mt-4">{icon.name}</p>
        </button>
    )
}

export default IconCard;