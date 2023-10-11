import { useEffect, useState } from "react"
import { DeviconBranch, IIcon, IconVersion } from "../../../types"
import { createIconCodeBlockText } from "../helpers/iconCodeBlock"
import Tooltip from "../../../layout/ToolTip";
import { CodeBlockTypes, IIconSize, codeBlockTypeList } from "../types/modalTypes";


interface IconCodeProps {
    icon: IIcon,
    iconSize: IIconSize;
    iconUrl: string,
    deviconBranch: DeviconBranch,
    selectedVersion: IconVersion
    handleCopyClick: (text: string) => void

}

const IconCode = ({ icon, iconSize, iconUrl, deviconBranch, selectedVersion, handleCopyClick }: IconCodeProps) => {

    const [selectedOption, setSelectedOption] = useState<CodeBlockTypes>("Link")
    const [codeText, setCodeText] = useState<string>("")
    const codeBlockOptions = deviconBranch === "develop" ? codeBlockTypeList.filter((option) => option !== "<i> Tag") : codeBlockTypeList;

    const handleClick = (codeType: CodeBlockTypes) => {
        setSelectedOption(codeType)
    }

    useEffect(() => {
        const createCodeText = async () => {
            const text = await createIconCodeBlockText(icon, iconSize, iconUrl, selectedVersion, selectedOption);
            setCodeText(text);
        }
        createCodeText()
    }, [deviconBranch, icon, iconSize, iconUrl, selectedOption, selectedVersion])

    return (
        <div className='flex flex-col border-2 dark:border-zinc-600 rounded-lg overflow-hidden'>
            <div className='flex flex-row bg-zinc-900 '>
                <div className="flex mr-auto">
                    {codeBlockOptions.map((codeType) => (
                        <button onClick={() => { handleClick(codeType) }} className={`px-4 py-2  ${codeType === selectedOption ? "bg-green-600" : "bg-zinc-900"} hover:bg-green-700 text-white `}>
                            <span className='font-bold text-sm'>{codeType}</span>
                        </button>
                    ))}

                </div>
                <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                    <button onClick={() => { handleCopyClick(codeText) }} title='Copy Icon' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy Icon</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </Tooltip>
            </div>
            <div className='flex flex-row bg-zinc-800  px-4 py-8 text-white '>
                <p className="whitespace-nowrap">{codeText}</p>
            </div>
        </div>
    )
}

export default IconCode