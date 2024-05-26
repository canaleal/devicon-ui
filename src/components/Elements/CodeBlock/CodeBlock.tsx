import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { Tooltip } from '../Tooltip'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeBlockProps {
  code: string
  selectedOption?: string
  codeBlockOptions?: string[]
  onClickCodeBlockOption?: (codeType: string) => void
  children?: React.ReactNode
}

const customStyle = {
  margin: '0rem',
  padding: '0.75rem 1rem ',
  borderRadius: '0rem'
}

export const CodeBlock = ({ code, selectedOption, codeBlockOptions, onClickCodeBlockOption }: CodeBlockProps) => {
  const codeString = code.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <div className={`flex flex-col border-2 dark:border-dark-500  rounded-lg overflow-hidden h-fit`}>
      <div className='flex flex-row bg-dark-600 justify-between border-b  border-dark-500'>

        {codeBlockOptions && onClickCodeBlockOption && (
          <div className='flex flex-row mr-auto'>
            {codeBlockOptions.map((codeType) => (
              <button
                key={codeType}
                onClick={() => {
                  onClickCodeBlockOption(codeType)
                }}
                className={`px-4 py-2 h-12   ${codeType === selectedOption ? 'bg-primary-600' : 'bg-dark-900'} hover:bg-primary-800 text-white `}
              >
                <span className='font-bold text-sm'>{codeType}</span>
              </button>
            ))}
          </div>
        )}

        <Tooltip content='Copy Code' position='bottom' flashMessage='Copied!'>
          <button
            onClick={() => {
              copyToClipboard(codeString)
            }}
            className='px-4 py-3 h-12 hover:text-primary-800 text-white flex ml-auto'
          >
            <p className='font-bold text-sm my-auto'>Copy Code</p>
            <i className='fa-solid fa-copy ml-2 my-auto'></i>
          </button>
        </Tooltip>
      </div>

      <SyntaxHighlighter customStyle={customStyle} language='javascript' style={a11yDark} wrapLongLines={false}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
