
interface AltNameBarProps {
    altnames: string[];
}

const AltNameBar = ({ altnames }: AltNameBarProps) => {
    
    if (!altnames.length) return <></>
    return (
        <div className="flex flex-row dark:text-white">
            <span className="my-auto">Alternate Names:</span>
            {altnames.map((altName, index) => (<span key={index} className="text-sm underline my-auto ml-2">{altName}</span>))}
        </div>
    )
}

export default AltNameBar