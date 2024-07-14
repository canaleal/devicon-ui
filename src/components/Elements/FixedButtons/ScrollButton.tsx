import { useState } from 'react'
import { FIXED_BUTTON_POSITIONS } from './FixedButtonSize'
import './styles/fixedButton.css'

export interface ScrollButtonProps {
  position: keyof typeof FIXED_BUTTON_POSITIONS
  extraClasses?: string
}

export const ScrollButton = ({ position, extraClasses = '' }: ScrollButtonProps) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    scrolled > 300 ? setVisible(true) : setVisible(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <button
      onClick={scrollToTop}
      className={` fixed-button ${!visible ? 'fixed-button--hidden' : ''} ${FIXED_BUTTON_POSITIONS[position]} ${extraClasses}`}
    >
      <i className='fa fa-arrow-up' aria-hidden='true'></i>
    </button>
  )
}

export default ScrollButton
