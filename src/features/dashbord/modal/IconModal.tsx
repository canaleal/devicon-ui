import { useState } from 'react'
import { DEVICON_VERSION_RELEASE } from '../../../constants'
import { DeviconBranch, IIcon, IconVersion } from '../../../types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { Tooltip } from '../../../components/Elements/Tooltip'
import { IIconSize, ICON_SIZE_OPTIONS, INIT_ICON_SIZE } from './types'
import { Dropdown } from '../../../components/Elements/Dropdown'
import { Table } from '../../../components/Elements/Table'
import { TextBar } from '../../../components/Elements/TextBar'

import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'
import IconCode from './IconCode'
import IconImage from './IconImage'
import ColorPickerDropdown from '../../../components/Elements/Dropdown/ColorPickerDropdown'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0])
  const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(INIT_ICON_SIZE)
  const [selectedColor, setSelectedColor] = useState<string>(icon.color)
  const iconUrl = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch)

  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className={BUTTON_STYLES.base}>
          <p className='font-bold text-2xl'>{icon.name}</p>
          <i className='fa-solid fa-copy text-xl'></i>
        </button>
      </Tooltip>

      <section className='flex flex-col 2xl:flex-row my-4 gap-8'>
        <IconImage iconUrl={iconUrl} iconName={icon.name} iconSize={selectedIconSize} extraClasses='flex-1' />
        <div className='flex-1 flex flex-col gap-4'>
          <TextBar icon={{ icon: 'fa-solid fa-folder', copyTitle: 'Copy Tags' }} content={[icon.name]} />
          <div className='flex flex-row gap-4 w-full'>
            <Dropdown
              title='Version'
              isDisabled={false}
              size='full'
              selectedOption={selectedVersion}
              options={icon.versions.svg}
              onChange={(value) => {
                setSelectedVersion(value as IconVersion)
              }}
            />
            <Dropdown
              title='Size'
              isDisabled={false}
              size='full'
              selectedOption={selectedIconSize.name}
              options={ICON_SIZE_OPTIONS.map((option) => option.name)}
              onChange={(value) => {
                setSelectedIconSize(ICON_SIZE_OPTIONS.find((option) => option.name === value)!)
              }}
            />
            <ColorPickerDropdown
              title='Color'
              isDisabled={!icon.versions.font.includes(selectedVersion)}
              size='full'
              defaultColor={icon.color}
              selectedColor={selectedColor}
              onChange={(color) => {
                setSelectedColor(color)
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
      </section>

      <IconCode
        icon={icon}
        iconSize={selectedIconSize}
        iconUrl={iconUrl}
        deviconBranch={deviconBranch}
        selectedVersion={selectedVersion}
      />

      <div className='hidden lg:flex flex-row justify-between mt-4'>
        <TextBar title='Alt Names' content={icon.altnames ?? []} />
        <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
      </div>
    </>
  )
}

export default IconModal
