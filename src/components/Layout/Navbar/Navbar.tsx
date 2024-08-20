import Logo from '../../Elements/Widgets/Logo/Logo'
import { useEffect, useState } from 'react'
import storage from '../../../helpers/storage'
import './styles/navbar.css'

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
    <button onClick={toggleDarkMode} className='dark-mode-toggle'>
      {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
    </button>
  )
}

const Navbar = () => {
  return (
    <>
      <header className='navbar'>
        <div className='navbar-content'>
          <Logo />
          <DarkModeToggle />
        </div>
      </header>

      <div className='navbar-placeholder' />
    </>
  )
}

export default Navbar
