import { useState } from 'react';
import { DEVICON_VERSION_RELEASE } from '../../constants';
import { DeviconBranch, IIcon, IconVersion } from '../../types';
import AltNameBar from './AltNameBar';
import TagsBar from './TagsBar';
import IconImage from './IconImage';
import IconCode from './IconCode';
import { createDeviconIconUrl } from '../../helpers/iconUrl';

interface IconModalProps {
    icon: IIcon;
    deviconBranch: DeviconBranch;
    handleClose: () => void;
}

const IconModal = ({ icon, deviconBranch, handleClose }: IconModalProps) => {

    const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0]);
    const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch);

    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedVersion(value as IconVersion);
    }

    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-600 bg-opacity-50">
            <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-2/3">
                <button
                    className="absolute top-0 right-0 bg-zinc-900 hover:bg-zinc-800 text-white p-4 text-4xl leading-none rounded-bl-lg rounded-tr-lg"
                    onClick={handleClose}
                >
                    &times;

                </button>

                <div className="flex flex-row dark:text-white">
                    <button onClick={()=>{handleCopyClick(icon.name)}} title='Copy Name' className='p-2 hover:text-green-600 flex'>
                        <p className="font-bold text-3xl">{icon.name}</p>
                        <i className="fa-solid fa-copy text-xl ml-2 my-auto"></i>
                    </button>

                </div>

                <div className="flex flex-row my-4 gap-8">

                    <IconImage iconUrl={iconUrl} iconName={icon.name} />

                    <div className="flex-1 flex flex-col gap-4">
                        {icon.tags.length > 0 && (
                            <TagsBar tags={icon.tags} handleCopyClick={handleCopyClick}/>
                        )}
                        <select onChange={handleVersionChange} className="bg-white dark:bg-zinc-900 dark:text-white dark:border-zinc-600 border rounded-lg px-4 py-4">
                            {icon.versions.svg.map((version, index) => (
                                <option key={index} value={version}>{version}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <IconCode icon={icon} iconUrl={iconUrl} handleCopyClick={handleCopyClick} />

                <div className='flex flex-row justify-between mt-4'>
                    {icon.altnames && (
                        <AltNameBar altnames={icon.altnames} />
                    )}
                    <p className='dark:text-white'>{DEVICON_VERSION_RELEASE}</p>
                </div>
            </div>
        </section>
    );
}

export default IconModal;
