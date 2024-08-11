import Logo from '../Elements/Widgets/Logo/Logo'

const Navbar = () => {
  return (

    <header className='flex flex-col w-full border-b border-gray-600/20 bg-dark-900 text-white'>
      <div className="py-6 mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[90rem]">
        <Logo />

      </div>
    </header>

  )
}

export default Navbar
