export interface CodeBlockProps {
    title: string;
    code: string;
    children?: React.ReactNode;
}

export const CodeBlock = ({ title, code, children }: CodeBlockProps) => {

    return (
        <div className={`flex flex-row justify-between bg-white dark:bg-zinc-900 dark:text-white border dark:border-zinc-600   shadow-sm rounded-lg p-4`}>
            <div className="flex flex-col">
                <p className="text-subtitle text-primary">{title}</p>
                <p>{code}</p>
            </div>

            {children}
        </div>
    )
}

export default CodeBlock