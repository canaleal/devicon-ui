import { copyToClipboard } from '../../../helpers/copyToClipboard.ts'
import { Tooltip } from '../../Atoms/Tooltip'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './codeBlock.css'

const SYNTAX_HIGHLIGHTER_STYLE = {
  margin: '0rem',
  padding: ' 1rem ',
  borderRadius: '0rem',
  height: '3.5rem',
  alignItems: 'center',
  justifyContent: 'center'
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
        {title && <p className='code-block__header-title'>{title}</p>}
        {codeBlockOptions && onClickCodeBlockOption && (
          <div className='code-block__header-options'>
            {codeBlockOptions.map((codeType) => (
              <button
                key={codeType}
                onClick={() => onClickCodeBlockOption(codeType)}
                className={`code-block__button ${codeType === selectedOption ? 'code-block__button--selected' : ''}`}
              >
                <span>{codeType}</span>
              </button>
            ))}
          </div>
        )}
        <Tooltip content='Copy Code' position='bottom' flashMessage='Copied!'>
          <button onClick={() => copyToClipboard(codeString)} className='code-block__button code-block__button--copy'>
            <span>Copy Code</span>
            <i className='fa-solid fa-copy'></i>
          </button>
        </Tooltip>
      </div>

      <div className='code-block__content'>
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
