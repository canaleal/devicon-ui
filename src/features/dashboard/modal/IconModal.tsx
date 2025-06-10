import { useEffect } from 'react'
import { DeviconBranch, IIcon } from '../../../types'
import { INIT_ICON_SIZE, CodeBlockOptionTypes, IIconSettings } from './types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { createIconCodeBlockText, getCodeBlockOptions } from './helpers/codeBlockContent'
import { getSVGErrors } from './helpers/svgChecker'
import { useIconSettingStore } from './store/iconSettingStore'

import IconImage from './widgets/iconImage/IconImage'
import ModalHeader from './widgets/modalHeader/ModalHeader'
import ModalFooter from './widgets/modalFooter/ModalFooter'
import IconOptions from './widgets/iconOptions/IconOptions'
import CodeBlock from '../../../components/Elements/CodeBlock/CodeBlock'

import './styles/iconModal.css'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
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

  const buildInitialSettings = (): IIconSettings => ({
    iconUrl: createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch),
    selectedVersion: icon.versions.svg[0],
    selectedIconSize: INIT_ICON_SIZE,
    selectedColor: icon.color
  })

  const loadCodeText = async (settings: IIconSettings, option: CodeBlockOptionTypes) => {
    const code = await createIconCodeBlockText(icon, settings, option)
    setCodeText(code)

    if (option === 'SVG') {
      const errors = getSVGErrors(icon, code)
      console.log(errors)
    }
  }

  useEffect(() => {
    const settings = buildInitialSettings()
    const options = getCodeBlockOptions(deviconBranch, icon, settings.selectedVersion)

    setIconSettings(settings)
    setCodeBlockOptions(options)
    setSelectedCodeBlockOption(options[0])
    loadCodeText(settings, options[0])
  }, [icon])

  const handleOptionChange = (value: CodeBlockOptionTypes) => {
    if (value === selectedCodeBlockOption) return
    setSelectedCodeBlockOption(value)
    loadCodeText(iconSettings, value)
  }

  return (
    <>
      <ModalHeader iconName={icon.name} />
      <section className='icon-section'>
        <IconImage icon={icon} deviconBranch={deviconBranch} extraClasses='icon-container' />
        <IconOptions icon={icon} deviconBranch={deviconBranch} getCodeText={loadCodeText} />
      </section>
      <CodeBlock
        code={codeText}
        codeBlockOptions={codeBlockOptions}
        selectedOption={selectedCodeBlockOption}
        onClickCodeBlockOption={(option) => handleOptionChange(option as CodeBlockOptionTypes)}
      />
      <ModalFooter icon={icon} deviconBranch={deviconBranch} />
    </>
  )
}

export default IconModal
