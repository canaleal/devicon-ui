import { useState } from 'react';
import { DEVICON_VERSION_RELEASE } from '../../../constants';
import { DeviconBranch, IIcon, IconVersion } from '../../../types';
import { createDeviconIconUrl } from '../../../helpers/iconUrl';
import { Tooltip } from '../../../components/Elements/Tooltip';
import { IIconSize, ICON_SIZE_OPTIONS, INIT_ICON_SIZE } from './types';
import { Dropdown } from '../../../components/Form/Dropdown';
import { Table } from '../../../components/Elements/Table';
import { TextBar } from '../../../components/Elements/TextBar';
import { IconImage, TagsBar, IconCode } from './widgets';
import { copyToClipboard } from '../../../helpers/copyToClipboard';


interface IconModalProps {
    icon: IIcon;
    deviconBranch: DeviconBranch;
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {

   
    const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0]);
    const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(INIT_ICON_SIZE);
    const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch);

    // const [selectedColor, setSelectedColor] = useState<string>(icon.color);
    // const [isFontVersion, setIsFontVersion] = useState(false);
    // useEffect(() => {
    //     const isFont = icon.aliases.some((alias)=>{ return alias.base == selectedVersion}) || FONT_VERSIONS.includes(selectedVersion);
    //     setIsFontVersion(isFont)
    // }, [selectedVersion])

    return (
        <>
            <div className="flex flex-row dark:text-white">

                <Tooltip content='Copy Icon' position='bottom' flashMessage="Copied!">
                    <button onClick={() => copyToClipboard(icon.name)} className='p-2 hover:text-primary flex '>
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
                        <Dropdown size='full' selectedOption={selectedVersion} options={icon.versions.svg} onChange={(value) => { setSelectedVersion(value as IconVersion) }} />
                        <Dropdown size='full' selectedOption={selectedIconSize.name} options={ICON_SIZE_OPTIONS.map((option) => option.name)} onChange={(value) => { setSelectedIconSize(ICON_SIZE_OPTIONS.find((option) => option.name === value)!) }} />
                    </div>
                    <Table
                        data={icon.aliases}
                        headers={['Base', 'Alias']}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        rowRenderer={(item) => [item.base, item.alias]}
                        onRowClick={(item) => { setSelectedVersion(item.base as IconVersion) }}
                    />
                    {/* {isFontVersion &&
                        <ColorPicker size='full' defaultColor={icon.color} color={selectedColor} onColorChange={(color) => { setSelectedColor(color) }} />
                    } */}
                </div>
            </div>

            <IconCode icon={icon} iconSize={selectedIconSize} iconUrl={iconUrl} deviconBranch={deviconBranch} selectedVersion={selectedVersion} />

            <div className='flex flex-row justify-between mt-4'>
                <TextBar title='Alt Names' texts={icon.altnames ?? []} />
                <p className='dark:text-white'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</p>
            </div>
        </>
    );
}

export default IconModal;
