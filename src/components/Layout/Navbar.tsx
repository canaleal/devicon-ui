
import DeviconLogo from '../Elements/DeviconLogo/DeviconLogo'

const Navbar = () => {
    return (
        <header className='flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-4  gap-4  w-full border-b border-dark-400 bg-dark-900 text-smoke-100'>
            <DeviconLogo />
        </header>
    )
}

export default Navbar