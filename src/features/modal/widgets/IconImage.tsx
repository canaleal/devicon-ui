import { useState } from "react";

import Tooltip from "../../../components/Elements/Tooltip/Tooltip";
import { IIconSize } from "../types/modalTypes";
import darkModeStorage from "../../../helpers/darkMode";


interface IconContainerProps {
    iconName: string;
    iconSize: IIconSize;
    iconUrl: string;
}

const IconImage = ({ iconName, iconSize, iconUrl }: IconContainerProps) => {

    const [isDark, setIsDark] = useState<boolean>(darkModeStorage.getIsDark());
    const toggleBackground = () => {
        setIsDark(!isDark);
    }

    return (
        <div className={`flex-1 flex flex-col border-2 rounded-lg p-4  h-[30rem] ${isDark ? "bg-zinc-900 text-white dark:border-zinc-600  " : "bg-white"}`}>
            <img className='m-auto' height={iconSize.height} width={iconSize.width} src={iconUrl} alt={iconName} />
            <div className="flex flex-row gap-4">
                <Tooltip content='Toggle Background' position='top' >
                    <button onClick={toggleBackground} className='p-2 hover:text-yellow-600 flex text-2xl'>
                        {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default IconImage;