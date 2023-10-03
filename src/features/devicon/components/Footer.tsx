
export const Footer = () => {
    return (
        <div className='flex flex-row gap-16  px-64 py-16 bg-zinc-900 text-white'>

            <div className='flex-1'>
                <p className="text-subtitle">Contact</p>
                <p className="mt-4 text-sm w-4/5">If you have any legal concerns regarding copyrights or want to report an abuse, please reach out to us at <a className="hover:text-green-500 text-green-400" href="mailto:info@devicon.dev">info@devicon.dev</a> Any code/logo contributions should be made through our GitHub repository listed above.</p>

                <p className="text-subtitle mt-8">Disclaimer</p>
                <p className="mt-4 text-sm w-4/5">All product names, logos, and brandsare property of their respective owners. All company, product and service names used in this website are for identification purposes only. Usage of these names, logos, and brands does not imply endorsement of Devicon or its members. All icons/SVGs in this project are not monetized in anyway. It is up to the user to use the logo properly according to the company/group's brand policy. Usage of this site or any icons/SVGs from Devicon means acknowledgement of these conditions.</p>
            </div>

            <div className='flex-1 flex flex-col'>

                <p className="text-subtitle">Links</p>
                <a href="https://github.com/devicons/devicon/" target="_blank" className="mt-4  hover:text-green-500 text-green-400">GitHub</a>
                <a href="https://devicon.dev/" target="_blank" className="hover:text-green-500 text-green-400">Devicon.dev</a>
                <a href="https://colordesigner.io/tools" target="_blank" className="hover:text-green-500 text-green-400">Color Designer</a>
            </div>

            <div className='flex-1 flex flex-row gap-2'>
                <img title="react" className="h-8 w-8" src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/react/react-original.svg" alt="icon-name" />
                <img title="react-router" className="h-8 w-8" src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/reactrouter/reactrouter-original.svg" alt="icon-name" />
                <img title="tailwind" className="h-8 w-8" src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/tailwindcss/tailwindcss-original.svg" alt="icon-name" />
                <img title="jest" className="h-8 w-8"  src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/jest/jest-plain.svg" alt="icon-name" />
                <img title="vite" className="h-8 w-8" src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/vitejs/vitejs-original.svg" alt="icon-name" />
            </div>

        </div>
    )
}
