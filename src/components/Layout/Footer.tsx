import ContactLogos from "../Elements/Widgets/Logo/ContactLogos"
import Logo from "../Elements/Widgets/Logo/Logo"

const Footer = () => {
    return (
        <footer className='flex flex-col w-full bg-gray-50 '>
            <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[90rem]">


                <div className='grid grid-cols-4 w-full py-16'>
                    <div className="col-span-2 flex flex-col gap-4 ">
                        <Logo />
                    </div>
                    <div className="col-span-1 flex flex-col gap-2 text-sm">
                        <p className="mb-2  text-gray-400">Product</p>
                        <a className="font-medium transition-colors text-gray-950 hover:text-gray-700 w-fit" href="https://github.com/devicons/devicon/?tab=readme-ov-file#readme" target="_blank" rel="noreferrer">Read Me</a>
                        <a className="font-medium transition-colors text-gray-950 hover:text-gray-700 w-fit" href="https://github.com/devicons/devicon/?tab=MIT-1-ov-file#readme" target="_blank" rel="noreferrer">Github License</a>
                        <a className="font-medium transition-colors text-gray-950 hover:text-gray-700 w-fit" href="https://github.com/devicons/devicon/releases" target="_blank" rel="noreferrer">Releases</a>
                    </div>
                    <div className="col-span-1 flex flex-col gap-2 text-sm">
                        <p className="mb-2  text-gray-400">Community</p>
                        <a className="font-medium transition-colors text-gray-950 hover:text-gray-700 w-fit" href="https://discord.com/invite/hScy8KWACQ" target="_blank" rel="noreferrer">Discord</a>
                    </div>
                </div>


                <div className="relative isolate mt-12 flex justify-between items-center border-t border-gray-600/20 pb-20 pt-6 text-sm">
                    <p className="text-gray-400 text-sm">© 2024 Devicon. All rights reserved.</p>
                    <ContactLogos />
                </div>
            </div>

        </footer>
    )
}

export default Footer