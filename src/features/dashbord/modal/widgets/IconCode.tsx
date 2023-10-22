import { useEffect, useState } from "react"
import { DeviconBranch, IIcon, IconVersion } from "../../../../types"
import { createIconCodeBlockText } from "../helpers/iconCodeBlock"
import Tooltip from "../../../../components/Elements/Tooltip/Tooltip";
import { CodeBlockTypes, IIconSize, CODE_BLOCK_TYPE_LIST } from "../types";


interface IconCodeProps {
    icon: IIcon,
    iconSize: IIconSize;
    iconUrl: string,
    deviconBranch: DeviconBranch,
    selectedVersion: IconVersion
}

export const IconCode = ({ icon, iconSize, iconUrl, deviconBranch, selectedVersion }: IconCodeProps) => {
  
    const codeBlockOptions = deviconBranch === "develop" ? CODE_BLOCK_TYPE_LIST.filter((option) => option !== "<i> Tag") : CODE_BLOCK_TYPE_LIST;
    const [selectedOption, setSelectedOption] = useState<CodeBlockTypes>("Link")
    const [codeText, setCodeText] = useState<string>("")
  
    const handleClick = (codeType: CodeBlockTypes) => {
        setSelectedOption(codeType)
    }

    useEffect(() => {
        const createCodeText = async () => {
            setCodeText(await createIconCodeBlockText(icon, iconSize, iconUrl, selectedVersion, selectedOption));
        }
        createCodeText()
    }, [deviconBranch, icon, iconSize, iconUrl, selectedOption, selectedVersion])

    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className='flex flex-col border-2 dark:border-zinc-600 rounded-lg overflow-hidden'>
            <div className='flex flex-row bg-zinc-900 '>
                <div className="flex mr-auto">
                    {codeBlockOptions.map((codeType) => (
                        <button key={codeType} onClick={() => { handleClick(codeType) }} className={`px-4 py-2  ${codeType === selectedOption ? "bg-green-600" : "bg-zinc-900"} hover:bg-green-700 text-white `}>
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
            <div className='flex flex-row bg-zinc-800  px-4 py-8 text-white overflow-auto'>
                <p className="whitespace-nowrap">{codeText}</p>
            </div>
        </div>
    )
}

export default IconCode