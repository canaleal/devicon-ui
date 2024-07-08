import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { Tooltip } from '../Tooltip'
import { CODE_BLOCK_BUTTON_STYLE } from './CodeButtonStyles'

interface CodeBlockButtonProps {
  codeType: string
  isSelected: boolean
  onClickCodeBlockOption: (codeType: string) => void
}

export const CodeBlockButton: React.FC<CodeBlockButtonProps> = ({ codeType, isSelected, onClickCodeBlockOption }) => (
  <button
    key={codeType}
    onClick={() => onClickCodeBlockOption(codeType)}
    className={`${CODE_BLOCK_BUTTON_STYLE.button} ${isSelected ? CODE_BLOCK_BUTTON_STYLE.selected : CODE_BLOCK_BUTTON_STYLE.colors}`}
  >
    <span>{codeType}</span>
  </button>
)

interface CopyCodeButtonProps {
  codeString: string
}

export const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({ codeString }) => (
  <Tooltip content='Copy Code' position='bottom' flashMessage='Copied!'>
    <button
      onClick={() => copyToClipboard(codeString)}
      className={`${CODE_BLOCK_BUTTON_STYLE.button} ${CODE_BLOCK_BUTTON_STYLE.colors}`}
    >
      <span>Copy Code</span>
      <i className='fa-solid fa-copy'></i>
    </button>
  </Tooltip>
)

interface CodeTitleProps {
  title: string
}

export const CodeTitle: React.FC<CodeTitleProps> = ({ title }) => (
  <div className={`${CODE_BLOCK_BUTTON_STYLE.button} ${CODE_BLOCK_BUTTON_STYLE.selected}`}>{title}</div>
)
