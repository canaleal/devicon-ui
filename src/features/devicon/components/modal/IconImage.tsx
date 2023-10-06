import { useState } from "react";
import { IIconSize } from "../../types";


interface IconContainerProps {
    iconName: string;
    iconSize: IIconSize;
    iconUrl: string;
}

const IconImage = ({ iconName, iconSize, iconUrl }: IconContainerProps) => {

    const [isLight, setIsLight] = useState<boolean>(true);
    const toggleBackground = () => {
        setIsLight(!isLight);
    }

    return (
        <div className={`flex-1 flex flex-col border-2 rounded-lg p-4  h-[30rem] ${isLight ? "bg-white " : "bg-zinc-900 text-white dark:border-zinc-600 "}`}>
            <img className='m-auto' height={iconSize.height} width={iconSize.width} src={iconUrl} alt={iconName} />

            <div className="flex flex-row gap-4">
                <button title='Toggle Background' onClick={toggleBackground} className='p-2 hover:text-yellow-600 flex text-2xl'>
                    {isLight ? ( <i className="fa-solid fa-moon"></i> ) : ( <i className="fa-solid fa-sun"></i> )}
                </button>
            </div>
        </div>
    )
}

export default IconImage;