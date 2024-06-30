import { useEffect, useState } from 'react'
import { DeviconBranch, IIcon, IconVersion } from '../../../../types'
import { createIconCodeBlockText } from '../helpers/iconCodeBlock'
import { CodeBlockOptionTypes, IIconSize, CODE_BLOCK_OPTIONS } from '../types'
import { CodeBlock } from '../../../../components/Elements/CodeBlock'

interface IconCodeProps {
  icon: IIcon
  iconSize: IIconSize
  iconUrl: string
  deviconBranch: DeviconBranch
  selectedVersion: IconVersion
}

export const IconCode = ({ icon, iconSize, iconUrl, deviconBranch, selectedVersion }: IconCodeProps) => {
  const codeBlockOptions = (deviconBranch === 'develop' || !icon.versions.font.includes(selectedVersion)) ? CODE_BLOCK_OPTIONS.filter((option) => option !== 'ICON') : CODE_BLOCK_OPTIONS;
  const [selectedOption, setSelectedOption] = useState<CodeBlockOptionTypes>('LINK')
  const [codeText, setCodeText] = useState<string>('')

  const handleClick = (codeType: string) => {
    setSelectedOption(codeType as CodeBlockOptionTypes)
  }

  useEffect(() => {
    const createCodeText = async () => {
      setCodeText(await createIconCodeBlockText(icon, iconSize, iconUrl, selectedVersion, selectedOption))
    }
    createCodeText()
  }, [deviconBranch, icon, iconSize, iconUrl, selectedOption, selectedVersion])

  useEffect(() => {
    if (codeBlockOptions.includes(selectedOption)) return;
    setSelectedOption('LINK')
  }, [codeBlockOptions]);

  return (
    <CodeBlock
      code={codeText}
      codeBlockOptions={codeBlockOptions}
      selectedOption={selectedOption}
      onClickCodeBlockOption={handleClick}
    />
  )
}

export default IconCode
