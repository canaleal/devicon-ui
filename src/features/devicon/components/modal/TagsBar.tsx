import Tooltip from "../../../../components/ToolTip";

interface AltNameBarProps {
    tags: string[];
    handleCopyClick: (text: string) => void;
}

const TagsBar = ({ tags, handleCopyClick }: AltNameBarProps) => {
    return (
        <div className='flex flex-row dark:text-white'>
            <Tooltip content='Copy Categories' position='bottom' flashMessage="Copied!">
                <button onClick={() => { handleCopyClick(tags.toString()) }} title='Copy Categories' className='p-2 hover:text-green-600 flex'>
                    <i className="fa-solid fa-folder"></i>
                </button>
            </Tooltip>
            {
                tags.map((tag, index) => (
                    <span key={index} className="text-sm underline my-auto ml-2">{tag}</span>
                ))
            }
        </div>
    )
}


export default TagsBar