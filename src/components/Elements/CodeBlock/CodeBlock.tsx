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
        padding: '0.75rem 1rem ',
        borderRadius: '0rem',
        "white-space": "nowrap"
    }

    // remove new llines and spaces so its 1 line
    const codeString = code.replace(/(\r\n|\n|\r)/gm, "");

    return (
        <div className={`flex flex-col border-2 dark:border-zinc-600  rounded-lg overflow-hidden h-fit`}>
            <div className='flex flex-row bg-zinc-1000 justify-between'>
                {children}
                <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { copyToClipboard(codeString) }} className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy Code</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </Tooltip>
            </div>

            <SyntaxHighlighter customStyle={customStyle} language="javascript" style={a11yDark} wrapLongLines={false}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock