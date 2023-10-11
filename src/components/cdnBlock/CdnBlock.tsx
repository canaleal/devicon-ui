import { DeviconBranch } from '../../types';

interface CdnBlockProps {
    deviconBranch: DeviconBranch;
}

const CdnBlock = ({ deviconBranch }: CdnBlockProps) => {
    const cdnLink = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">'
    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            {deviconBranch === "master" ?
                <div className="bg-zinc-900 text-white shadow-sm  flex flex-row  rounded-lg mb-6">
                    <div className="flex flex-col px-4 py-4">
                        <p className='mt-auto text-subtitle text-green-600'>Place this in your header (once per HTML file) to use {"<i> tag Icons"}</p>
                        <p className='whitespace-nowrap '>{cdnLink}</p>
                    </div>

                    <button onClick={() => { handleCopyClick(cdnLink) }} title='Copy Icon' className='px-4 py-2 hover:text-green-600 text-white flex ml-auto'>
                        <p className="font-bold text-sm my-auto">Copy CDN</p>
                        <i className="fa-solid fa-copy ml-2 my-auto"></i>
                    </button>
                </div>
                :

                <></>
            }
        </>
    )
}

export default CdnBlock