import Tooltip from "../../../components/Elements/Tooltip/Tooltip";

interface TagBarProps {
    tags: string[];
}

const TagsBar = ({ tags }: TagBarProps) => {

    const handleCopyClick = () => {
        navigator.clipboard.writeText(tags.toString());
    }

    return (
        <>
            {!tags.length ? <></> :
                <div className='flex flex-row dark:text-white'>
                    <Tooltip content='Copy Categories' position='bottom' flashMessage="Copied!">
                        <button onClick={handleCopyClick} className='p-2 hover:text-green-600 flex'>
                            <i className="fa-solid fa-folder"></i>
                        </button>
                    </Tooltip>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className="text-sm underline my-auto ml-2">{tag}</span>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default TagsBar