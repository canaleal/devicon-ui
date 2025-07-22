import { useEffect, useState } from 'react'
import { DeviconBranch, IconVersion, IIcon } from '../../../types'
import { INIT_ICON_SIZE, CodeBlockOptionTypes, IIconSettings, ICON_SIZE_OPTIONS } from './types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { createIconCodeBlockText, getCodeBlockOptions } from './helpers/codeBlockContent'
import { getSVGErrors } from './helpers/svgChecker'

import { IconImage } from './widgets/iconImage/IconImage'
import { IconOptions } from './widgets/iconOptions/IconOptions'
import { CodeBlock } from '../../../components/Molecules/CodeBlock/CodeBlock'
import { TextBar } from '../../../components/Atoms/TextBar'
import { Tooltip } from '../../../components/Atoms/Tooltip'
import { copyToClipboard } from '../../../helpers/copyToClipboard.ts'
import { DEVICON_VERSION_RELEASE } from '../../../constants'
import './styles/iconModal.css'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const initialVersion = icon.versions.svg[0]

  const buildSettings = (version: IconVersion): IIconSettings => ({
    iconUrl: createDeviconIconUrl(icon.name, version, deviconBranch),
    selectedVersion: version,
    selectedIconSize: INIT_ICON_SIZE,
    selectedColor: icon.color
  })

  const [iconSettings, setIconSettings] = useState<IIconSettings>(() => buildSettings(initialVersion))
  const [codeBlockOptions, setCodeBlockOptions] = useState<CodeBlockOptionTypes[]>([])
  const [selectedCodeBlockOption, setSelectedCodeBlockOption] = useState<CodeBlockOptionTypes>('SVG')
  const [codeText, setCodeText] = useState('')

  const loadCodeText = async (settings: IIconSettings, option: CodeBlockOptionTypes) => {
    const code = await createIconCodeBlockText(icon, settings, option)
    setCodeText(code)

    if (option === 'SVG') {
      const errors = getSVGErrors(icon, code)
      console.log(errors)
    }
  }

  const updateSettingsAndReload = (newSettings: Partial<IIconSettings>, overrideCodeOption?: CodeBlockOptionTypes) => {
    const updated = { ...iconSettings, ...newSettings }
    setIconSettings(updated)
    loadCodeText(updated, overrideCodeOption ?? selectedCodeBlockOption)
  }

  const handleVersionChange = (version: string) => {
    if (version === iconSettings.selectedVersion) return

    const options = getCodeBlockOptions(deviconBranch, icon, version as IconVersion)
    setCodeBlockOptions(options)

    const newCodeOption = options.includes(selectedCodeBlockOption)
      ? selectedCodeBlockOption
      : (options[0] as CodeBlockOptionTypes)

    if (newCodeOption !== selectedCodeBlockOption) {
      setSelectedCodeBlockOption(newCodeOption)
    }

    updateSettingsAndReload(
      {
        selectedVersion: version as IconVersion,
        iconUrl: createDeviconIconUrl(icon.name, version as IconVersion, deviconBranch)
      },
      newCodeOption
    )
  }

  const handleSizeChange = (sizeName: string) => {
    if (sizeName === iconSettings.selectedIconSize.name) return

    const newSize = ICON_SIZE_OPTIONS.find((opt) => opt.name === sizeName)!
    updateSettingsAndReload({ selectedIconSize: newSize })
  }

  const handleColorChange = (color: string) => {
    if (color === iconSettings.selectedColor) return
    updateSettingsAndReload({ selectedColor: color })
  }

  useEffect(() => {
    const initialSettings = buildSettings(initialVersion)
    const options = getCodeBlockOptions(deviconBranch, icon, initialSettings.selectedVersion)

    setIconSettings(initialSettings)
    setCodeBlockOptions(options)
    setSelectedCodeBlockOption(options[0])
    loadCodeText(initialSettings, options[0])
  }, [icon])

  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className='button button--icon'>
          <i className='fa-solid fa-copy text-xl'></i>
          <p className='icon-title'>{icon.name}</p>
        </button>
      </Tooltip>

      <section className='icon-section'>
        <IconImage icon={icon} deviconBranch={deviconBranch} iconSettings={iconSettings} />
        <IconOptions
          icon={icon}
          deviconBranch={deviconBranch}
          iconSettings={iconSettings}
          onVersionChange={handleVersionChange}
          onSizeChange={handleSizeChange}
          onColorChange={handleColorChange}
        />
      </section>

      <CodeBlock
        code={codeText}
        codeBlockOptions={codeBlockOptions}
        selectedOption={selectedCodeBlockOption}
        onClickCodeBlockOption={(opt) => {
          if (opt !== selectedCodeBlockOption) {
            setSelectedCodeBlockOption(opt as CodeBlockOptionTypes)
            loadCodeText(iconSettings, opt as CodeBlockOptionTypes)
          }
        }}
      />

      <div className='alt-names-bar'>
        <TextBar extraClasses='hidden lg:inline-flex' title='Tags' content={icon.tags} />
        <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
      </div>
    </>
  )
}
