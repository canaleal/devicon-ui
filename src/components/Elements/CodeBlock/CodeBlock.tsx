import { copyToClipboard } from "../../../helpers/copyToClipboard";
import { Tooltip } from "../Tooltip";


export interface CodeBlockProps {
    code: string;
    children?: React.ReactNode;
}

export const CodeBlock = ({ code, children }: CodeBlockProps) => {

    return (
        <div className={`flex flex-col border-2 dark:border-zinc-600  rounded-lg overflow-hidden h-fit`}>
            <div className='flex flex-row bg-zinc-900 justify-between'>
                {children}
                <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { copyToClipboard(code) }} className='px-4 py-2 hover:text-primary text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy Code</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </Tooltip>
            </div>
            <pre className="flex flex-row bg-zinc-800  px-4 py-8 text-white overflow-auto">
                <code className="language-typescript">{code}</code>
            </pre>
        </div>
    )
}

export default CodeBlock