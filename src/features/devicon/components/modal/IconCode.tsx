import { useEffect, useState } from "react"
import { CodeTypes, codeTypesList } from "../../types"


interface IconCodeProps {
    iconUrl: string
}

const IconCode = ({ iconUrl }: IconCodeProps) => {

    const [selectedOption, setSelectedOption] = useState<CodeTypes>("SVG Link")
    const [codeText, setCodeText] = useState<string>("")

    const handleClick = (codeType: CodeTypes) => {
        setSelectedOption(codeType)
    }

    const createHighlightedText = async () => {
        let text = ""
        if (selectedOption === "SVG Link") {
            text = iconUrl
        }
        else if (selectedOption === "Img Tag") {
            text = `<img src="${iconUrl}" alt="icon-name" />`
        } else if (selectedOption === "SVG") {
            const response = await fetch(iconUrl);
            const svgContent = await response.text();
            text = svgContent
        }
        setCodeText(text)
    }

    useEffect (() => {
        (async () => {
            await createHighlightedText()
        })()
    }, [iconUrl, selectedOption])

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row bg-zinc-900 rounded-t-lg overflow-hidden'>
                {codeTypesList.map((codeType) => (
                    <button onClick={() => { handleClick(codeType) }} className={`px-4 py-2  ${codeType === selectedOption ? "bg-zinc-800" : "bg-zinc-900"} hover:bg-green-800 text-white `}>
                        <span className='font-bold text-sm'>{codeType}</span>
                    </button>
                ))}
            </div>
            <div className='flex flex-row bg-zinc-800 rounded-b-lg px-4 py-8 text-white overflow-auto'>
                <p className="whitespace-nowrap">{codeText}</p>
            </div>
        </div>
    )
}

export default IconCode