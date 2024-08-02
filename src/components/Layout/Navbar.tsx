import DeviconLogo from '../Elements/DeviconLogo/DeviconLogo'

const Navbar = () => {
  return (
    <header className='flex flex-col px-4 py-3  gap-4  w-full border-b bg-white dark:border-dark-400 dark:bg-dark-900 dark:text-smoke-100'>
      <DeviconLogo />
    </header>
  )
}

export default Navbar
