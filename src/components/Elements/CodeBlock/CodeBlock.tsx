import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { Tooltip } from '../Widgets/Tooltip'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './styles/codeBlock.css'

const SYNTAX_HIGHLIGHTER_STYLE = {
  margin: '0rem',
  padding: ' 1rem ',
  borderRadius: '0rem',
  height: '3.5rem',
  alignItems: 'center',
  justifyContent: 'center'
}

interface CodeBlockOptionProps {
  optionName: string
  isOptionSelected: boolean
  onClickCodeBlockOption: (codeType: string) => void
}

const CodeBlockOption = ({ optionName, isOptionSelected, onClickCodeBlockOption }: CodeBlockOptionProps) => {
  return (
    <button
      key={optionName}
      onClick={() => onClickCodeBlockOption(optionName)}
      className={`code-block__button ${isOptionSelected ? 'code-block__button--selected' : ''}`}
    >
      <span>{optionName}</span>
    </button>
  )
}

export interface CodeBlockProps {
  code: string
  title?: string
  selectedOption?: string
  codeBlockOptions?: string[]
  onClickCodeBlockOption?: (codeType: string) => void
}

export const CodeBlock = ({
  code,
  title,
  selectedOption,
  codeBlockOptions,
  onClickCodeBlockOption
}: CodeBlockProps) => {
  const codeString = code.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <div className='code-block'>
      <div className='code-block__header'>
        {title && <p className='code-block__header__title'>{title}</p>}
        {codeBlockOptions && onClickCodeBlockOption && (
          <div className='flex flex-row mr-auto'>
            {codeBlockOptions.map((codeType) => (
              <CodeBlockOption
                key={codeType}
                optionName={codeType}
                isOptionSelected={codeType === selectedOption}
                onClickCodeBlockOption={onClickCodeBlockOption}
              />
            ))}
          </div>
        )}
        <Tooltip content='Copy Code' position='bottom' flashMessage='Copied!'>
          <button onClick={() => copyToClipboard(codeString)} className='code-block__button ml-auto'>
            <span>Copy Code</span>
            <i className='fa-solid fa-copy'></i>
          </button>
        </Tooltip>
      </div>

      <div className='overflow-hidden bg-dark-900'>
        <SyntaxHighlighter
          customStyle={SYNTAX_HIGHLIGHTER_STYLE}
          language='javascript'
          style={atomDark}
          wrapLongLines={false}
          showInlineLineNumbers={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
