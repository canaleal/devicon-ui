import { useEffect, useState } from "react"
import { CodeTypes, codeTypesList } from "../../types"


interface IconCodeProps {
    iconUrl: string,
    handleCopyClick: (text: string) => void

}

const IconCode = ({ iconUrl, handleCopyClick }: IconCodeProps) => {

    const [selectedOption, setSelectedOption] = useState<CodeTypes>("SVG Link")
    const [codeText, setCodeText] = useState<string>("")

    const handleClick = (codeType: CodeTypes) => {
        setSelectedOption(codeType)
    }

    const createCodeText = async () => {
        let text = "";
        switch (selectedOption) {
            case "SVG Link":
                text = iconUrl;
                break;
            case "Img Tag":
                text = `<img src="${iconUrl}" alt="icon-name" />`;
                break;
            case "SVG": {
                const response = await fetch(iconUrl);
                text = await response.text();
                break;
            }
        }
        setCodeText(text);
    }



    useEffect(() => {
        (async () => {
            await createCodeText()
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

                <button onClick={() => { handleCopyClick(codeText) }} title='Copy Icon' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                    <p className="font-bold text-sm my-auto">Copy Icon</p>
                    <i className="fa-solid fa-copy ml-2 my-auto"></i>
                </button>
            </div>
            <div className='flex flex-row bg-zinc-800 rounded-b-lg px-4 py-8 text-white overflow-auto'>
                <p className="whitespace-nowrap">{codeText}</p>
            </div>
        </div>
    )
}

export default IconCode