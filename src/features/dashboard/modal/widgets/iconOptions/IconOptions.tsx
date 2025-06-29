import { Dropdown } from '../../../../../components/Atoms/Dropdown/Dropdown'
import { ColorPickerDropdown } from '../../../../../components/Atoms/Dropdown/ColorPickerDropdown'
import { Table } from '../../../../../components/Atoms/Table'
import { createDeviconIconUrl } from '../../../../../helpers/iconUrl'
import { DeviconBranch, IconVersion, IIcon } from '../../../../../types'
import { getCodeBlockOptions } from '../../helpers/codeBlockContent'
import { useIconSettingStore } from '../../store/iconSettingStore'
import { CodeBlockOptionTypes, ICON_SIZE_OPTIONS, IIconSettings } from '../../types'

interface IIconOptions {
  icon: IIcon
  deviconBranch: DeviconBranch
  getCodeText: (settings: IIconSettings, codeBlockOption: CodeBlockOptionTypes) => Promise<void>
}

export const IconOptions = ({ icon, deviconBranch, getCodeText }: IIconOptions) => {
  const { iconSettings, setIconSettings, setCodeBlockOptions, selectedCodeBlockOption, setSelectedCodeBlockOption } =
    useIconSettingStore()

  const updateCodeBlockOption = (options: string[], currentOption: CodeBlockOptionTypes) => {
    return options.includes(currentOption) ? currentOption : (options[0] as CodeBlockOptionTypes)
  }

  const onVersionChange = (version: string) => {
    if (version === iconSettings.selectedVersion) return
    const options = getCodeBlockOptions(deviconBranch, icon, version as IconVersion)
    setCodeBlockOptions(options)

    const newCodeBlockOption = updateCodeBlockOption(options, selectedCodeBlockOption)
    if (newCodeBlockOption !== selectedCodeBlockOption) {
      setSelectedCodeBlockOption(newCodeBlockOption)
    }

    const iconUrl = createDeviconIconUrl(icon.name, version as IconVersion, deviconBranch)
    const tempIconSettings = {
      ...iconSettings,
      selectedVersion: version as IconVersion,
      iconUrl
    }

    setIconSettings(tempIconSettings)
    getCodeText(tempIconSettings, newCodeBlockOption)
  }

  const onSizeChange = (value: string) => {
    if (value === iconSettings.selectedIconSize.name) return
    const tempIconSettings = {
      ...iconSettings,
      selectedIconSize: ICON_SIZE_OPTIONS.find((option) => option.name === value)!
    }
    setIconSettings(tempIconSettings)
    getCodeText(tempIconSettings, selectedCodeBlockOption)
  }

  const onColorChange = (color: string) => {
    if (color === iconSettings.selectedColor) return
    const tempIconSettings = {
      ...iconSettings,
      selectedColor: color
    }
    setIconSettings(tempIconSettings)
    getCodeText(tempIconSettings, selectedCodeBlockOption)
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
