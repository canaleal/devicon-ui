import { useState } from 'react'
import { FIXED_BUTTON_POSITIONS, FIXED_BUTTON_STYLE } from './FixedButtonStyles'

export interface ScrollButtonProps {
  position: keyof typeof FIXED_BUTTON_POSITIONS
}

const ScrollButton = ({ position }: ScrollButtonProps) => {
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
      className={`${FIXED_BUTTON_POSITIONS[position]} ${FIXED_BUTTON_STYLE.base} ${FIXED_BUTTON_STYLE.light} ${visible ? FIXED_BUTTON_STYLE.visible : FIXED_BUTTON_STYLE.hidden}`}
    >
      <i className='fa fa-arrow-up' aria-hidden='true'></i>
    </button>
  )
}

export default ScrollButton
