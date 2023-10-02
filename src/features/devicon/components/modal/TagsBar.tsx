
interface AltNameBarProps {
    tags: string[];
}

const TagsBar = ({ tags }: AltNameBarProps) => {
    return (
        <div className='flex flex-row'>
            <button title='Copy Categories' className='p-2 hover:text-green-600 flex'>
                <i className="fa-solid fa-folder"></i>
            </button>
            {
                tags.map((tag, index) => (
                    <span key={index} className="text-sm underline my-auto ml-2">{tag}</span>
                ))
            }
        </div>
    )
}


export default TagsBar