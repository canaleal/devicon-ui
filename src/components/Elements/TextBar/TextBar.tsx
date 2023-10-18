
export interface TextBarProps {
    title: string;
    texts: string[];
}

const TextBar = ({ title, texts }: TextBarProps) => {

    if (!texts.length) return <></>
    return (
        <div className="flex flex-row dark:text-white">
            <span className="my-auto">{title}:</span>
            {texts.map((text) => (<span key={text} className="text-sm underline my-auto ml-2">{text}</span>))}
        </div>
    )
}

export default TextBar