import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { Tooltip } from '../Tooltip'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import "./styles/codeBlock.css"

export interface CodeBlockProps {
  code: string
  title?: string
  selectedOption?: string
  codeBlockOptions?: string[]
  onClickCodeBlockOption?: (codeType: string) => void
  children?: React.ReactNode
}

const SYNTAX_HIGHLIGHTER_STYLE = {
  margin: '0rem',
  padding: '0.75rem 1rem ',
  borderRadius: '0rem'
}

interface CodeBlockOptionProps {
  codeType: string
  isSelected: boolean
  onClickCodeBlockOption: (codeType: string) => void
}

const CodeBlockOption = ({ codeType, isSelected, onClickCodeBlockOption }: CodeBlockOptionProps) => {
  const codeButtonClick = () => {
    onClickCodeBlockOption(codeType)
  }

  return (
    <button
      key={codeType}
      onClick={codeButtonClick}
      className={`code-block__button ${isSelected ? "code-block__button--selected" : ""}`}
    >
      <span>{codeType}</span>
    </button>
  )
}

interface CopyCodeButtonProps {
  codeString: string
}

const CopyCodeButton = ({ codeString }: CopyCodeButtonProps) => {
  const copyButtonClick = () => {
    copyToClipboard(codeString)
  }

  return (
    <Tooltip content='Copy Code' position='bottom' flashMessage='Copied!'>
      <button
        onClick={copyButtonClick}
        className={`code-block__button ml-auto `}
      >
        <span>Copy Code</span>
        <i className='fa-solid fa-copy'></i>
      </button>
    </Tooltip>
  )
}

const CodeTitle = ({ title }: { title: string }) => {
  return <p className="code-block__button code-block__button--selected">{title}</p>
}

export const CodeBlock = ({
  title,
  code,
  selectedOption,
  codeBlockOptions,
  onClickCodeBlockOption
}: CodeBlockProps) => {
  const codeString = code.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <div className="code-block">
      <div className="code-block__header">
        {title && <CodeTitle title={title} />}
        {codeBlockOptions && onClickCodeBlockOption && (
          <div className='flex flex-row mr-auto'>
            {codeBlockOptions.map((codeType) => (
              <CodeBlockOption
                key={codeType}
                codeType={codeType}
                isSelected={codeType === selectedOption}
                onClickCodeBlockOption={onClickCodeBlockOption}
              />
            ))}
          </div>
        )}
        <CopyCodeButton codeString={codeString} />
      </div>

      <SyntaxHighlighter
        customStyle={SYNTAX_HIGHLIGHTER_STYLE}
        language='javascript'
        style={a11yDark}
        wrapLongLines={false}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
