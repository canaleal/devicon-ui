/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import { DEVICON_IMAGE_URL_BASE } from '../constants';
import { IIcon } from '../types';

interface IconModalProps {
    icon: IIcon;
    handleClose: () => void;
}

const IconModal = ({ icon, handleClose }: IconModalProps) => {

    const [selectedVersion, setSelectedVersion] = useState<string>(icon.versions.svg[0]);
    const [iconUrl , setIconUrl] = useState<string>("");
    const [svgContent , setSvgContent] = useState<string>("");

    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedVersion(value);
    }

    const createIconUrl = async () => {
        if (!icon) return;
        const iconUrl = `${DEVICON_IMAGE_URL_BASE}/${icon.name}/${icon.name}-${selectedVersion}.svg`
        const response = await fetch(iconUrl);
        const svgContent = await response.text();
        setSvgContent(svgContent);
        setIconUrl(iconUrl);
    }

    useEffect(() => {
        (async () => {
            await createIconUrl();
        })();
    }, [selectedVersion]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-600 bg-opacity-50">

            <div className="relative bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-2/3">
                <button
                    className="absolute top-2 right-2 text-4xl leading-none hover:text-gray-600"
                    onClick={handleClose}
                >
                    &times;

                </button>

                <div className="flex flex-row">

                    <p className="font-bold text-3xl">{icon?.name}</p>

                </div>

                <div className="flex flex-row py-8 mt-2 gap-8">

                    <div className="flex-1 flex flex-col border-2 rounded-lg p-8 h-[24rem]">
                        <img className='m-auto' height={256} width={256} src={iconUrl} alt={icon.name} />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">

                        <div className='flex flex-row gap-2'>
                            {icon.tags.map((tag, index) => (
                                <span key={index} className="text-sm underline">{tag}</span>
                            ))}
                        </div>

                        <select onChange={handleVersionChange} className="bg-white border rounded-lg px-4 py-4">
                            {icon.versions.svg.map((version, index) => (
                                <option key={index} value={version}>{version}</option>
                            ))}
                        </select>


                    </div>

                </div>

 
            </div>
        </div>
    );
}

export default IconModal;
