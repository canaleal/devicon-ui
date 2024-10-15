import { useEffect } from 'react'

import { DeviconBranch, IIcon } from '../../../types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { INIT_ICON_SIZE, CodeBlockOptionTypes, IIconSettings } from './types'

import IconImage from './widgets/iconImage/IconImage'
import { createIconCodeBlockText, getCodeBlockOptions } from './helpers/codeBlockContent'
import { useIconSettingStore } from './store/iconSettingStore'

import './styles/iconModal.css'
import CodeBlock from '../../../components/Elements/CodeBlock/CodeBlock'
import ModalHeader from './widgets/modalHeader/ModalHeader'
import ModalFooter from './widgets/modalFooter/ModalFooter'
import IconOptions from './widgets/iconOptions/IconOptions'

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

  const getCodeText = async (settings: IIconSettings, codeBlockOption: CodeBlockOptionTypes) => {
    const code = await createIconCodeBlockText(icon, settings, codeBlockOption)
    setCodeText(code)
  }

  useEffect(() => {
    const initSettings = {
      iconUrl: createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch),
      selectedVersion: icon.versions.svg[0],
      selectedIconSize: INIT_ICON_SIZE,
      selectedColor: icon.color
    }

    const initOptions = getCodeBlockOptions(deviconBranch, icon, initSettings.selectedVersion)
    setIconSettings(initSettings)
    setCodeBlockOptions(initOptions)
    setSelectedCodeBlockOption(initOptions[0])
  }, [icon])

  useEffect(() => {
    getCodeText(iconSettings, selectedCodeBlockOption)
  }, [iconSettings, selectedCodeBlockOption])

  const onSelectedOptionChange = (value: CodeBlockOptionTypes) => {
    if (value === selectedCodeBlockOption) return
    setSelectedCodeBlockOption(value)
  }

  return (
    <>
      <ModalHeader iconName={icon.name} />
      <section className='icon-section'>
        <IconImage icon={icon} extraClasses='icon-container' />
        <IconOptions icon={icon} deviconBranch={deviconBranch} />
      </section>
      <CodeBlock
        code={codeText}
        codeBlockOptions={codeBlockOptions}
        selectedOption={selectedCodeBlockOption}
        onClickCodeBlockOption={(codeType) => onSelectedOptionChange(codeType as CodeBlockOptionTypes)}
      />
      <ModalFooter altnames={icon.altnames} deviconBranch={deviconBranch} />
    </>
  )
}

export default IconModal
