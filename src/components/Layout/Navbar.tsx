import DeviconLogo from '../Elements/DeviconLogo/DeviconLogo'

const Navbar = () => {
  return (
    <header className='flex flex-col px-8 md:px-16 lg:px-24 xl:px-32 py-3  gap-4  w-full border-b bg-white dark:border-dark-400 dark:bg-dark-900 dark:text-white'>
      <DeviconLogo />
    </header>
  )
}

export default Navbar
