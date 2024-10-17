import { Dropdown } from '../../../../../components/Elements/Form/Dropdown'
import ColorPickerDropdown from '../../../../../components/Elements/Form/Dropdown/ColorPickerDropdown'
import { Table } from '../../../../../components/Elements/Table'
import { createDeviconIconUrl } from '../../../../../helpers/iconUrl'
import { DeviconBranch, IconVersion, IIcon } from '../../../../../types'
import { getCodeBlockOptions } from '../../helpers/codeBlockContent'
import { useIconSettingStore } from '../../store/iconSettingStore'
import { ICON_SIZE_OPTIONS } from '../../types'

export const IconOptions = ({ icon, deviconBranch }: { icon: IIcon; deviconBranch: DeviconBranch }) => {
  const { iconSettings, setIconSettings, setCodeBlockOptions, selectedCodeBlockOption, setSelectedCodeBlockOption } =
    useIconSettingStore()

  const onVersionChange = (value: string) => {
    if (value === iconSettings.selectedVersion) return
    const options = getCodeBlockOptions(deviconBranch, icon, value as IconVersion)
    setCodeBlockOptions(options)
    const tempCodeBlockOption = !options.includes(selectedCodeBlockOption) ? options[0] : selectedCodeBlockOption
    if (tempCodeBlockOption != selectedCodeBlockOption) {
      setSelectedCodeBlockOption(tempCodeBlockOption)
    }
    const iconUrl = createDeviconIconUrl(icon.name, value as IconVersion, deviconBranch)
    setIconSettings({ ...iconSettings, selectedVersion: value as IconVersion, iconUrl })
  }

  const onSizeChange = (value: string) => {
    if (value === iconSettings.selectedIconSize.name) return
    setIconSettings({
      ...iconSettings,
      selectedIconSize: ICON_SIZE_OPTIONS.find((option) => option.name === value)!
    })
  }

  const onColorChange = (color: string) => {
    if (color === iconSettings.selectedColor) return
    setIconSettings({ ...iconSettings, selectedColor: color })
  }

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

export default IconOptions
