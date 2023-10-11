
export const Footer = () => {
    return (
        <div className='flex flex-row gap-16  px-32 py-16 bg-zinc-900 text-white'>

            <div className='flex-1'>
                <p className="text-subtitle">Disclaimer</p>
                <p className="mt-4 text-sm w-4/5">All product names, logos, and brandsare property of their respective owners. All company, product and service names used in this website are for identification purposes only. Usage of these names, logos, and brands does not imply endorsement of Devicon or its members. All icons/SVGs in this project are not monetized in anyway. It is up to the user to use the logo properly according to the company/group's brand policy. Usage of this site or any icons/SVGs from Devicon means acknowledgement of these conditions.</p>
            </div>

            <div className='flex-1 flex flex-col'>
                <p className="text-subtitle">Tools</p>
                <a href="https://colordesigner.io/tools" target="_blank" className="mt-2 hover:text-green-500 text-green-400">Color Designer</a>
                <a href="https://react-svgr.com/playground/" target="_blank" className="hover:text-green-500 text-green-400">SVG to JSX</a>
                <a href="https://www.iloveimg.com/resize-image/resize-svg" target="_blank" className="hover:text-green-500 text-green-400">SVG Resizer</a>
            </div>

            <div className='flex-1 flex flex-col'>
                <p className="text-subtitle">Links</p>
                <a href="https://github.com/devicons/devicon/" target="_blank" className="mt-2 hover:text-green-500 text-green-400">GitHub</a>
                <a href="https://devicon.dev/" target="_blank" className="hover:text-green-500 text-green-400">Devicon.dev</a>
            </div>

        </div>
    )
}
