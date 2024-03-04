import { copyToClipboard } from "../../../helpers/copyToClipboard";
import { Tooltip } from "../Tooltip";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeBlockProps {
    code: string;
    children?: React.ReactNode;
}

export const CodeBlock = ({ code, children }: CodeBlockProps) => {

    const customStyle = {
        margin: '0rem',
        padding: '1rem',
        borderRadius: '0rem',

    }

    return (
        <div className={`flex flex-col border-2 dark:border-zinc-600  rounded-lg overflow-hidden h-fit`}>
            <div className='flex flex-row bg-zinc-1000 justify-between'>
                {children}
                <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { copyToClipboard(code) }} className='px-4 py-2 hover:text-indigo-600 text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy Code</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </Tooltip>
            </div>
            {/* <pre className="flex flex-row bg-zinc-900  px-4 py-4 text-white overflow-auto">
                <code className="language-typescript whitespace-nowrap">{code}</code>
            </pre> */}

            <SyntaxHighlighter customStyle={customStyle} language="javascript" style={a11yDark} wrapLongLines={false}>
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock