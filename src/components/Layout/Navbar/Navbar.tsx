import Logo from '../../Elements/Logo/Logo'
import { useEffect, useState } from 'react'
import storage from '../../../helpers/storage'
import './navbar.css'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(storage.getToken()['isDark'] ?? false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    const token = storage.getToken()
    if (!token) return
    storage.setToken({
      ...token,
      isDark: newDarkMode
    })
    setDarkMode(newDarkMode)
  }

  return (
    <button onClick={toggleDarkMode} className='links'>
      {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
    </button>
  )
}

const Navbar = () => {
  return (
    <>
      <header className='navbar'>
        <div className="base-container navbar__container">
          <div className={"navbar__start"}>
            <Logo />
          </div>
          <div className={"navbar__end"}>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <div className='navbar__placeholder' />
    </>
  )
}

export default Navbar
