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

const CodeBlockOption = ({
  codeType,
  selectedOption,
  onClickCodeBlockOption
}: {
  codeType: string
  selectedOption: string | undefined
  onClickCodeBlockOption: (codeType: string) => void
}) => {
  return (
    <button
      key={codeType}
      onClick={() => {
        onClickCodeBlockOption(codeType)
      }}
      className={`px-4 py-2 h-12 hover:bg-frog-800 text-smoke-100 transition-colors  ${codeType === selectedOption ? 'bg-frog-800 text-smoke-100' : ''}  `}
    >
      <span className='font-bold text-sm'>{codeType}</span>
    </button>
  )
}

const CopyCodeButton = ({ codeString }: { codeString: string }) => {
  return (
    <Tooltip content='Copy Code' position='top' flashMessage='Copied!'>
      <button
        onClick={() => {
          copyToClipboard(codeString)
        }}
        className='px-4 py-3 h-12  flex ml-auto hover:bg-frog-800 text-smoke-100 transition-colors'
      >
        <p className='font-bold text-sm my-auto'>Copy Code</p>
        <i className='fa-solid fa-copy ml-2 my-auto'></i>
      </button>
    </Tooltip>
  )
}

export const CodeBlock = ({ code, selectedOption, codeBlockOptions, onClickCodeBlockOption }: CodeBlockProps) => {
  const codeString = code.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <div className={`flex flex-col border border-dark-400 rounded-lg h-fit`}>
      <div className='flex flex-row justify-between border-b  border-dark-400 bg-dark-900 '>
        {codeBlockOptions && onClickCodeBlockOption && (
          <div className='flex flex-row mr-auto'>
            {codeBlockOptions.map((codeType) => (
              <CodeBlockOption
                key={codeType}
                codeType={codeType}
                selectedOption={selectedOption}
                onClickCodeBlockOption={onClickCodeBlockOption}
              />
            ))}
          </div>
        )}

        <CopyCodeButton codeString={codeString} />
      </div>

      <SyntaxHighlighter customStyle={customStyle} language='javascript' style={a11yDark} wrapLongLines={false}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
