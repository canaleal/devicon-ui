import { useEffect, useState } from "react"
import { CodeBlockTypes, IIcon, codeBlockTypesList } from "../../types"
import { createIconCodeBlockText } from "../../helpers/iconCodeBlock"


interface IconCodeProps {
    icon: IIcon,
    iconUrl: string,
    handleCopyClick: (text: string) => void

}

const IconCode = ({ icon, iconUrl, handleCopyClick }: IconCodeProps) => {

    const [selectedOption, setSelectedOption] = useState<CodeBlockTypes>("SVG Link")
    const [codeText, setCodeText] = useState<string>("")

    const handleClick = (codeType: CodeBlockTypes) => {
        setSelectedOption(codeType)
    }

    useEffect(() => {
        const createCodeText = async () => {
            const text = await createIconCodeBlockText(icon, iconUrl, selectedOption);
            setCodeText(text);
        }
        createCodeText()
    }, [icon, iconUrl, selectedOption])

    return (
        <div className='flex flex-col border-2 dark:border-zinc-600 rounded-lg overflow-hidden'>
            <div className='flex flex-row bg-zinc-900 '>
                {codeBlockTypesList.map((codeType) => (
                    <button onClick={() => { handleClick(codeType) }} className={`px-4 py-2  ${codeType === selectedOption ? "bg-zinc-800" : "bg-zinc-900"} hover:bg-green-800 text-white `}>
                        <span className='font-bold text-sm'>{codeType}</span>
                    </button>
                ))}

                <button onClick={() => { handleCopyClick(codeText) }} title='Copy Icon' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                    <p className="font-bold text-sm my-auto">Copy Icon</p>
                    <i className="fa-solid fa-copy ml-2 my-auto"></i>
                </button>
            </div>
            <div className='flex flex-row bg-zinc-800  px-4 py-8 text-white '>
                <p className="whitespace-nowrap">{codeText}</p>
            </div>
        </div>
    )
}

export default IconCode