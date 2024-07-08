import { useEffect, useState } from 'react'
import storage from '../../../helpers/storage'
import { FIXED_BUTTON_POSITIONS, FIXED_BUTTON_STYLE } from './FixedButtonStyles'

export interface DarkModeProps {
  position: keyof typeof FIXED_BUTTON_POSITIONS
}

const DarkModeToggle = ({ position }: DarkModeProps) => {
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
    <button
      onClick={toggleDarkMode}
      className={` ${FIXED_BUTTON_POSITIONS[position]} ${FIXED_BUTTON_STYLE.base} ${FIXED_BUTTON_STYLE.colors}`}
    >
      {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
    </button>
  )
}

export default DarkModeToggle
