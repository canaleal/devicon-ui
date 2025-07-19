import { Dropdown } from '../../../../../components/Atoms/Dropdown/Dropdown'
import { ColorPickerDropdown } from '../../../../../components/Atoms/Dropdown/ColorPickerDropdown'
import { Table } from '../../../../../components/Atoms/Table'
import { DeviconBranch, IIcon } from '../../../../../types'
import { ICON_SIZE_OPTIONS, IIconSettings } from '../../types'

interface IIconOptions {
  icon: IIcon
  deviconBranch: DeviconBranch
  iconSettings: IIconSettings
  onVersionChange: (version: string) => void
  onSizeChange: (size: string) => void
  onColorChange: (color: string) => void
}

export const IconOptions = ({ icon, iconSettings, onVersionChange, onSizeChange, onColorChange }: IIconOptions) => {
  return (
    <div className='icon-options'>
      <div className='option-row'>
        <Dropdown
          title='Version'
          isDisabled={false}
          extraClasses='w-full'
          selectedOption={iconSettings.selectedVersion}
          options={icon.versions.svg}
          onChange={onVersionChange}
        />
        <Dropdown
          title='Size'
          isDisabled={false}
          extraClasses='w-full hidden lg:block'
          selectedOption={iconSettings.selectedIconSize.name}
          options={ICON_SIZE_OPTIONS.map((option) => option.name)}
          onChange={onSizeChange}
        />
        <ColorPickerDropdown
          title='Color'
          isDisabled={!icon.versions.font.includes(iconSettings.selectedVersion)}
          extraClasses='w-full hidden lg:block'
          defaultColor={icon.color}
          selectedColor={iconSettings.selectedColor}
          onColorChange={onColorChange}
        />
      </div>
      <Table
        title='Aliases'
        extraClasses='alias-table'
        data={icon.aliases}
        headers={['Base', 'Alias']}
        keyExtractor={(item, index) => `${item}-${index}`}
        rowRenderer={(item) => [item.base, item.alias]}
        onRowClick={(item) => onVersionChange(item.base)}
      />
    </div>
  )
}
