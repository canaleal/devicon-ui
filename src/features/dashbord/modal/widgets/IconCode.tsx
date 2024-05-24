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
  const codeBlockOptions =
    deviconBranch === 'develop' ? CODE_BLOCK_OPTIONS.filter((option) => option !== '<i> Tag') : CODE_BLOCK_OPTIONS
  const [selectedOption, setSelectedOption] = useState<CodeBlockOptionTypes>('Link')
  const [codeText, setCodeText] = useState<string>('')

  const handleClick = (codeType: CodeBlockOptionTypes) => {
    setSelectedOption(codeType)
  }

  useEffect(() => {
    const createCodeText = async () => {
      setCodeText(await createIconCodeBlockText(icon, iconSize, iconUrl, selectedVersion, selectedOption))
    }
    createCodeText()
  }, [deviconBranch, icon, iconSize, iconUrl, selectedOption, selectedVersion])

  return (
    <CodeBlock code={codeText}>
      <div className='flex mr-auto'>
        {codeBlockOptions.map((codeType) => (
          <button
            key={codeType}
            onClick={() => {
              handleClick(codeType)
            }}
            className={`px-4 py-2  ${codeType === selectedOption ? 'bg-primary-600' : 'bg-dark-900'} hover:bg-primary-800 text-white `}
          >
            <span className='font-bold text-sm'>{codeType}</span>
          </button>
        ))}
      </div>
    </CodeBlock>
  )
}

export default IconCode
