import { useEffect, useState } from 'react'
import storage from '../../helpers/storage'

const positions = {
  topLeft: 'top-8 left-8',
  topRight: 'top-8 right-8',
  bottomLeft: 'bottom-8 left-8',
  bottomRight: 'bottom-8 right-8'
}

export interface DarkModeProps {
  position: keyof typeof positions
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
      className={`z-50 fixed ${positions[position]} bg-primary-600 hover:bg-primary-800 text-white font-bold h-12  w-12 rounded-md z-20`}
    >
      {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
    </button>
  )
}

export default DarkModeToggle
