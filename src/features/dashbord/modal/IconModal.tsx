import { useState } from 'react'
import { DEVICON_VERSION_RELEASE } from '../../../constants'
import { DeviconBranch, IIcon, IconVersion } from '../../../types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { Tooltip } from '../../../components/Elements/Tooltip'
import { IIconSize, ICON_SIZE_OPTIONS, INIT_ICON_SIZE } from './types'
import { Dropdown } from '../../../components/Elements/Dropdown'
import { Table } from '../../../components/Elements/Table'
import { TextBar } from '../../../components/Elements/TextBar'
import { IconImage, TagList, IconCode } from './widgets'
import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0])
  const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(INIT_ICON_SIZE)
  const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch)

  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className={BUTTON_STYLES.base}>
          <p className='font-bold text-2xl'>{icon.name}</p>
          <i className='fa-solid fa-copy text-xl'></i>
        </button>
      </Tooltip>

      <div className='flex flex-col 2xl:flex-row my-4 gap-8'>
        <IconImage iconUrl={iconUrl} iconName={icon.name} iconSize={selectedIconSize} extraClasses='flex-1' />
        <div className='flex-1 flex flex-col gap-4'>
          <TagList tags={icon.tags ?? []} extraClasses='hidden lg:flex' />
          <div className='flex flex-row gap-4 w-full'>
            <Dropdown
              title='Version'
              size='full'
              selectedOption={selectedVersion}
              options={icon.versions.svg}
              onChange={(value) => {
                setSelectedVersion(value as IconVersion)
              }}
            />
            <Dropdown
              title='Size'
              size='full'
              selectedOption={selectedIconSize.name}
              options={ICON_SIZE_OPTIONS.map((option) => option.name)}
              onChange={(value) => {
                setSelectedIconSize(ICON_SIZE_OPTIONS.find((option) => option.name === value)!)
              }}
            />
          </div>
          <Table
            title='Aliases'
            extraClasses='hidden lg:flex'
            data={icon.aliases}
            headers={['Base', 'Alias']}
            keyExtractor={(item, index) => `${item}-${index}`}
            rowRenderer={(item) => [item.base, item.alias]}
            onRowClick={(item) => {
              setSelectedVersion(item.base as IconVersion)
            }}
          />
        </div>
      </div>

      <IconCode
        icon={icon}
        iconSize={selectedIconSize}
        iconUrl={iconUrl}
        deviconBranch={deviconBranch}
        selectedVersion={selectedVersion}
      />

      <div className='hidden lg:flex flex-row justify-between mt-4'>
        <TextBar title='Alt Names' texts={icon.altnames ?? []} />
        <p className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</p>
      </div>
    </>
  )
}

export default IconModal
