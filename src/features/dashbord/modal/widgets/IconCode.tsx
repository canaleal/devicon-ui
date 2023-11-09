import { useEffect, useState } from "react"
import { DeviconBranch, IIcon, IconVersion } from "../../../../types"
import { createIconCodeBlockText } from "../helpers/iconCodeBlock"
import { CodeBlockTypes, IIconSize, CODE_BLOCK_TYPE_LIST } from "../types";
import { CodeBlock } from "../../../../components/Elements/CodeBlock";


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


    return (

        <CodeBlock code={codeText}>
            <div className="flex mr-auto">
                {codeBlockOptions.map((codeType) => (
                    <button key={codeType} onClick={() => { handleClick(codeType) }} className={`px-4 py-2  ${codeType === selectedOption ? "bg-primary" : "bg-zinc-900"} hover:bg-primary-dark text-white `}>
                        <span className='font-bold text-sm'>{codeType}</span>
                    </button>
                ))}
            </div>
        </CodeBlock>
    )
}

export default IconCode