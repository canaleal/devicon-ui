import { useEffect, useRef, useState, ReactNode } from 'react'
import './styles/dropdown.css'

interface BaseDropdownProps {
  title?: string
  isDisabled?: boolean
  renderButton: (props: { isOpen: boolean; toggle: () => void }) => ReactNode
  renderPopup: (props: { close: () => void }) => ReactNode
  extraClasses?: string
}

export const BaseDropdown = ({ title, renderButton, renderPopup, extraClasses = '' }: BaseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`dropdown-container ${extraClasses}`} ref={dropdownRef}>
      {title && <p className='dropdown-container__title'>{title}</p>}
      {renderButton({ isOpen, toggle })}
      {isOpen && renderPopup({ close })}
    </div>
  )
}
