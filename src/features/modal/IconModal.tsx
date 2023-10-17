import { useState } from 'react';
import { DEVICON_VERSION_RELEASE } from '../../constants';
import { DeviconBranch, IIcon, IconVersion } from '../../types';

import IconImage from './widgets/IconImage';
import IconCode from './widgets/IconCode';
import { createDeviconIconUrl } from '../../helpers/iconUrl';

import Tooltip from '../../components/Layout/ToolTip';
import Modal from '../../components/Layout/Modal';
import { IIconSize, iconSizeOptions } from './types/modalTypes';
import Dropdown from '../../components/Elements/Dropdown';
import GenericTable from '../../components/Elements/Table';
import TagsBar from './widgets/TagsBar';
import TextBar from '../../components/Elements/TextBar';

interface IconModalProps {
    icon: IIcon;
    deviconBranch: DeviconBranch;
    handleClose: () => void;
}

const IconModal = ({ icon, deviconBranch, handleClose }: IconModalProps) => {

    const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0]);
    const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(iconSizeOptions.find((option) => option.name === 'Large')!);

    const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch);


    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <Modal handleClose={handleClose}>

            <div className="flex flex-row ">

                <Tooltip content='Copy Icon' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { handleCopyClick(icon.name) }} className='p-2 hover:text-green-600 flex dark:text-white'>
                        <p className="font-bold text-3xl">{icon.name}</p>
                        <i className="fa-solid fa-copy text-xl ml-2 my-auto"></i>
                    </button>
                </Tooltip>

            </div>

            <div className="flex flex-col 2xl:flex-row my-4 gap-8">

                <IconImage iconUrl={iconUrl} iconName={icon.name} iconSize={selectedIconSize} />

                <div className="flex-1 flex flex-col gap-6">

                    <TagsBar tags={icon.tags ?? []} />


                    <div className='flex flex-row gap-6 w-full'>

                        <Dropdown classes='w-full' selectedOption={selectedVersion} options={icon.versions.svg} onChange={(value) => { setSelectedVersion(value as IconVersion) }} />
                        <Dropdown classes='w-full' selectedOption={selectedIconSize.name} options={iconSizeOptions.map((option) => option.name)} onChange={(value) => { setSelectedIconSize(iconSizeOptions.find((option) => option.name === value)!) }} />
                    </div>

                    <GenericTable
                        data={icon.aliases}
                        headers={['Base', 'Alias']}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        rowRenderer={(item) => [item.base, item.alias]}
                       
                    />

                   
                </div>
            </div>

            <IconCode icon={icon} iconSize={selectedIconSize} iconUrl={iconUrl} deviconBranch={deviconBranch} selectedVersion={selectedVersion} handleCopyClick={handleCopyClick} />

            <div className='flex flex-row justify-between mt-4'>
                <TextBar title='Alt Names' texts={icon.altnames ?? []} />
                <p className='dark:text-white'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</p>
            </div>
        </Modal>

    );
}

export default IconModal;
