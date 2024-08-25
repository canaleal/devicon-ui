import { useEffect } from 'react'
import { DEVICON_VERSION_RELEASE } from '../../../constants'
import { DeviconBranch, IIcon, IconVersion } from '../../../types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { Tooltip } from '../../../components/Elements/Widgets/Tooltip'
import { ICON_SIZE_OPTIONS, INIT_ICON_SIZE, CodeBlockOptionTypes, IIconSettings } from './types'
import { Dropdown } from '../../../components/Elements/Form/Dropdown'
import { Table } from '../../../components/Elements/Table'
import { TextBar } from '../../../components/Elements/Widgets/TextBar'
import { copyToClipboard } from '../../../helpers/copyToClipboard'
import IconImage from './iconImage/IconImage'
import ColorPickerDropdown from '../../../components/Elements/Form/Dropdown/ColorPickerDropdown'
import { CodeBlock } from '../../../components/Elements/CodeBlock'
import { createIconCodeBlockText, getCodeBlockOptions } from './helpers/codeBlockContent'
import { useIconSettingStore } from './iconSettingStore'
import './styles/iconModal.css'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const {
    codeText,
    setCodeText,
    iconSettings,
    codeBlockOptions,
    setIconSettings,
    setCodeBlockOptions,
    selectedCodeBlockOption,
    setSelectedCodeBlockOption
  } = useIconSettingStore()
  const getCodeText = async (tempIconSettings: IIconSettings, tempSelectedCodeBlock: CodeBlockOptionTypes) => {
    const code = await createIconCodeBlockText(icon, tempIconSettings, tempSelectedCodeBlock)
    setCodeText(code)
  }

  useEffect(() => {
    const initCodeBlockOptions = getCodeBlockOptions(deviconBranch, icon, iconSettings.selectedVersion)
    const initIconSetting = {
      iconUrl: createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch),
      selectedVersion: icon.versions.svg[0],
      selectedIconSize: INIT_ICON_SIZE,
      selectedColor: icon.color
    }
    setIconSettings(initIconSetting)
    setCodeBlockOptions(initCodeBlockOptions)
    getCodeText(initIconSetting, selectedCodeBlockOption)
  }, [icon])

  const onSelectedOptionChange = (value: string) => {
    setSelectedCodeBlockOption(value as CodeBlockOptionTypes)
    getCodeText(iconSettings, value as CodeBlockOptionTypes)
  }

  const onVersionChange = (value: string) => {
    const iconUrl = createDeviconIconUrl(icon.name, value as IconVersion, deviconBranch)
    const newIconSettings = { ...iconSettings, selectedVersion: value as IconVersion, iconUrl }
    setIconSettings(newIconSettings)

    const options = getCodeBlockOptions(deviconBranch, icon, value as IconVersion)
    setCodeBlockOptions(options)
    const tempCodeBlockOption = !options.includes(selectedCodeBlockOption) ? options[0] : selectedCodeBlockOption
    if (tempCodeBlockOption != selectedCodeBlockOption) {
      setSelectedCodeBlockOption(tempCodeBlockOption)
    }
    getCodeText(newIconSettings, tempCodeBlockOption)
  }

  const onSizeChange = (value: string) => {
    const newIconSettings = {
      ...iconSettings,
      selectedIconSize: ICON_SIZE_OPTIONS.find((option) => option.name === value)!
    }
    setIconSettings(newIconSettings)
    getCodeText(newIconSettings, selectedCodeBlockOption)
  }

  const onColorChange = (color: string) => {
    if (color != iconSettings.selectedColor) {
      const newIconSettings = { ...iconSettings, selectedColor: color }
      setIconSettings(newIconSettings)
      getCodeText(newIconSettings, selectedCodeBlockOption)
    }
  }

  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className='button button--icon'>
          <p className='icon-title'>{icon.name}</p>
          <i className='fa-solid fa-copy  text-xl'></i>
        </button>
      </Tooltip>

      <section className='icon-section'>
        <IconImage icon={icon} iconSettings={iconSettings} extraClasses='icon-container' />

        <div className='icon-options'>
          <TextBar icon={{ icon: 'fa-solid fa-folder', copyTitle: 'Copy Tags' }} content={[icon.name]} />
          <div className='option-row'>
            <Dropdown
              title='Version'
              isDisabled={false}
              extraClasses='w-full'
              selectedOption={iconSettings.selectedVersion}
              options={icon.versions.svg}
              onChange={(value) => {
                onVersionChange(value)
              }}
            />
            <Dropdown
              title='Size'
              isDisabled={false}
              extraClasses='w-full'
              selectedOption={iconSettings.selectedIconSize.name}
              options={ICON_SIZE_OPTIONS.map((option) => option.name)}
              onChange={(value) => {
                onSizeChange(value)
              }}
            />
            <ColorPickerDropdown
              title='Color'
              isDisabled={!icon.versions.font.includes(iconSettings.selectedVersion)}
              extraClasses='w-full'
              defaultColor={icon.color}
              selectedColor={iconSettings.selectedColor}
              onColorChange={(color) => {
                onColorChange(color)
              }}
            />
          </div>
          <Table
            title='Aliases'
            extraClasses='alias-table'
            data={icon.aliases}
            headers={['Base', 'Alias']}
            keyExtractor={(item, index) => `${item}-${index}`}
            rowRenderer={(item) => [item.base, item.alias]}
            onRowClick={(item) => {
              onVersionChange(item.base)
            }}
          />
        </div>
      </section>
      <CodeBlock
        code={codeText}
        codeBlockOptions={codeBlockOptions}
        selectedOption={selectedCodeBlockOption}
        onClickCodeBlockOption={(codeType) => onSelectedOptionChange(codeType)}
      />
      <div className='alt-names-bar'>
        <TextBar title='Alt Names' content={icon.altnames ?? []} />
        <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
      </div>
    </>
  )
}

export default IconModal
