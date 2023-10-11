import { DEVICON_CDN_URL } from '../../constants';
import Tooltip from '../../layout/ToolTip';
import { DeviconBranch } from '../../types';

interface CdnBlockProps {
    deviconBranch: DeviconBranch;
}

const CdnBlock = ({ deviconBranch }: CdnBlockProps) => {
    const cdnLink = `<link rel="stylesheet" href="${DEVICON_CDN_URL}">`
    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            {deviconBranch === "master" ?
                <div className="bg-zinc-900 text-white shadow-sm  flex flex-row  rounded-lg mb-6">
                    <div className="flex flex-col px-4 py-4 mr-auto">
                        <p className='mt-auto text-subtitle text-green-600'>Place this in your header (once per HTML file) to use {"<i> tag Icons"}</p>
                        <p className='whitespace-nowrap '>{cdnLink}</p>
                    </div>

                    <Tooltip content="Copy CDN" position='bottom' flashMessage="Copied!" >
                        <button onClick={() => { handleCopyClick(cdnLink) }} className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                            <p className="font-bold text-sm my-auto">Copy CDN</p>
                            <i className="fa-solid fa-copy ml-2 my-auto"></i>
                        </button>
                    </Tooltip>

                </div>
                :

                <></>
            }
        </>
    )
}

export default CdnBlock