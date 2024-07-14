import { useEffect, useState } from 'react'
import storage from '../../../helpers/storage'
import { FIXED_BUTTON_POSITIONS } from './FixedButtonSize'
import './styles/fixedButton.css'

export interface DarkModeProps {
  position: keyof typeof FIXED_BUTTON_POSITIONS
  extraClasses?: string
}

export const DarkModeToggle = ({ position, extraClasses = '' }: DarkModeProps) => {
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
    <button onClick={toggleDarkMode} className={`fixed-button ${FIXED_BUTTON_POSITIONS[position]} ${extraClasses}`}>
      {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
    </button>
  )
}

export default DarkModeToggle
