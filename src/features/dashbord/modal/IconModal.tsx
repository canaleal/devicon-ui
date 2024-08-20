import { useEffect, useState } from 'react'
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

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const [iconSettings, setIconSettings] = useState<IIconSettings>({
    iconUrl: createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch),
    selectedVersion: icon.versions.svg[0],
    selectedIconSize: INIT_ICON_SIZE,
    selectedColor: icon.color
  })

  const [codeBlockOptions, setCodeBlockOptions] = useState<CodeBlockOptionTypes[]>(
    getCodeBlockOptions(deviconBranch, icon, iconSettings.selectedVersion)
  )
  const [selectedCodeBlockOption, setSelectedCodeBlockOption] = useState<CodeBlockOptionTypes>('LINK')
  const [codeText, setCodeText] = useState<string>('')

  const getCodeText = async () => {
    const code = await createIconCodeBlockText(icon, iconSettings, selectedCodeBlockOption)
    setCodeText(code)
  }

  useEffect(() => {
    getCodeText()
  }, [selectedCodeBlockOption, iconSettings])

  const onSelectedOptionChange = (value: string) => {
    setSelectedCodeBlockOption(value as CodeBlockOptionTypes)
  }

  const onVersionChange = (value: string) => {
    const options = getCodeBlockOptions(deviconBranch, icon, value as IconVersion)
    setCodeBlockOptions(options)
    if (!options.includes(selectedCodeBlockOption)) {
      setSelectedCodeBlockOption(options[0])
    }

    const iconUrl = createDeviconIconUrl(icon.name, value as IconVersion, deviconBranch)
    const newIconSettings = { ...iconSettings, selectedVersion: value as IconVersion, iconUrl }
    setIconSettings(newIconSettings)
  }

  const onSizeChange = (value: string) => {
    const newIconSettings = {
      ...iconSettings,
      selectedIconSize: ICON_SIZE_OPTIONS.find((option) => option.name === value)!
    }
    setIconSettings(newIconSettings)
  }

  const onColorChange = (color: string) => {
    if (color != iconSettings.selectedColor) {
      const newIconSettings = { ...iconSettings, selectedColor: color }
      setIconSettings(newIconSettings)
    }
  }

  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className='button button--icon'>
          <p className='font-bold text-2xl'>{icon.name}</p>
          <i className='fa-solid fa-copy text-xl'></i>
        </button>
      </Tooltip>

      <section className='flex flex-col 2xl:flex-row my-4 gap-8'>
        <IconImage icon={icon} iconSettings={iconSettings} extraClasses='flex-1' />

        <div className='flex-1 flex flex-col gap-4'>
          <TextBar icon={{ icon: 'fa-solid fa-folder', copyTitle: 'Copy Tags' }} content={[icon.name]} />
          <div className='flex flex-row gap-4 w-full'>
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
            extraClasses='hidden lg:flex'
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
      <div className='hidden lg:flex flex-row justify-between mt-4'>
        <TextBar title='Alt Names' content={icon.altnames ?? []} />
        <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
      </div>
    </>
  )
}

export default IconModal
