import { useState } from 'react';
import { DEVICON_VERSION_RELEASE } from '../../constants';
import { DeviconBranch, IIcon, IconVersion } from '../../types';
import AltNameBar from './widgets/AltNameBar';
import TagsBar from './widgets/TagsBar';
import IconImage from './widgets/IconImage';
import IconCode from './widgets/IconCode';
import { createDeviconIconUrl } from '../../helpers/iconUrl';
import AliasNameTable from './widgets/AliasNameTable';
import Tooltip from '../../layout/ToolTip';
import Modal from '../../layout/Modal';
import { IIconSize, iconSizeOptions } from './types/modalTypes';

interface IconModalProps {
    icon: IIcon;
    deviconBranch: DeviconBranch;
    handleClose: () => void;
}

const IconModal = ({ icon, deviconBranch, handleClose }: IconModalProps) => {

    const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0]);
    const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(iconSizeOptions.find((option) => option.name === 'Large')!);

    const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch);

    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedVersion(value as IconVersion);
    }

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const sizeOption = iconSizeOptions.find((option) => option.name === value) || iconSizeOptions[1];
        setSelectedIconSize(sizeOption);
    }


    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <Modal handleClose={handleClose}>

            <div className="flex flex-row dark:text-white">

                <Tooltip content='Copy Icon' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { handleCopyClick(icon.name) }} className='p-2 hover:text-green-600 flex'>
                        <p className="font-bold text-3xl">{icon.name}</p>
                        <i className="fa-solid fa-copy text-xl ml-2 my-auto"></i>
                    </button>
                </Tooltip>

            </div>

            <div className="flex flex-col 2xl:flex-row my-4 gap-8">

                <IconImage iconUrl={iconUrl} iconName={icon.name} iconSize={selectedIconSize} />

                <div className="flex-1 flex flex-col gap-6">

                    <TagsBar tags={icon.tags ?? []} handleCopyClick={handleCopyClick} />


                    <div className='flex flex-row gap-6 w-full'>
                        <select onChange={handleVersionChange} className="bg-white dark:bg-zinc-900 dark:text-white dark:border-zinc-600 border rounded-lg px-4 py-4 w-full">
                            {icon.versions.svg.map((version, index) => (
                                <option key={index} value={version}>{version}</option>
                            ))}
                        </select>

                        <select value={selectedIconSize.name} onChange={handleSizeChange} className=" bg-white dark:bg-zinc-900 dark:text-white dark:border-zinc-600 border rounded-lg px-4 py-4 w-full">
                            {iconSizeOptions.map((size, index) => (
                                <option key={index} value={size.name}>{size.name} ({size.height} x {size.width})</option>
                            ))}
                        </select>
                    </div>


                    <AliasNameTable aliases={icon.aliases ?? []} />
                </div>
            </div>

            <IconCode icon={icon} iconSize={selectedIconSize} iconUrl={iconUrl} deviconBranch={deviconBranch} selectedVersion={selectedVersion} handleCopyClick={handleCopyClick} />

            <div className='flex flex-row justify-between mt-4'>
                <AltNameBar altnames={icon.altnames ?? []} />


                <p className='dark:text-white'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</p>
            </div>
        </Modal>

    );
}

export default IconModal;
