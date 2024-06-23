import { useState } from 'react'

const positions = {
  topLeft: 'top-8 left-8',
  topRight: 'top-8 right-8',
  bottomLeft: 'bottom-8 left-8',
  bottomRight: 'bottom-8 right-8'
}

export interface ScrollButtonProps {
  position: keyof typeof positions
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
      className={`fixed ${positions[position]}  font-bold h-12  w-12 rounded-md z-20 border`}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <i className='fa fa-arrow-up' aria-hidden='true'></i>
    </button>
  )
}

export default ScrollButton
