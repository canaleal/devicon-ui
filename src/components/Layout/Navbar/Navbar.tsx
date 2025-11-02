import { Logo } from '../../Atoms/Logo/Logo'

import './navbar.css'

export const Navbar = () => {
  return (
    <>
      <header className='navbar'>

        <div className="base-container navbar__container">


          <div className={'navbar__start'}>
            <Logo />
          </div>

        </div>

      </header>
      <div className='navbar__placeholder' />
    </>
  )
}
