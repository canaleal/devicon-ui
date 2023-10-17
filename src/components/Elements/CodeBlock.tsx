import Tooltip from "../Layout/ToolTip";

interface CodeBlockProps {
    title: string;
    code: string;
    classes?: string;
    copyCode?: boolean;
}

const CodeBlock = ({ title, code, classes, copyCode }: CodeBlockProps) => {

    const copyCodeText = () => {
        navigator.clipboard.writeText(code);
    }

    return (
        <div className={`flex flex-row justify-between bg-white dark:bg-zinc-900 dark:text-white border dark:border-zinc-600   shadow-sm rounded-lg p-4 ${classes}`}>
            <div className="flex flex-col">
                {title && <p className="text-subtitle text-green-600">{title}</p>}
                <p>{code}</p>
            </div>

            {copyCode &&
                <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                    <button onClick={copyCodeText} title='Copy Code' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy Code</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </Tooltip>}
        </div>
    )
}

export default CodeBlock