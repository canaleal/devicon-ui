import { useState, ReactNode, useEffect } from 'react'
import './styles/tooltip.css'
import { TooltipPosition, TOOLTIP_POSITIONS } from './tooltipPositions'

export interface TooltipProps {
  children: ReactNode
  content: string
  position: TooltipPosition
  flashMessage?: string
}

export const Tooltip = ({ children, content, position, flashMessage }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const [flashVisible, setFlashVisible] = useState(false)

  const handleMouseEnter = () => {
    setVisible(true)
  }

  const handleMouseLeave = () => {
    setVisible(false)
  }

  let timeoutId: number | null = null

  const handleClick = () => {
    if (flashMessage) {
      setFlashVisible(true)
      timeoutId = window.setTimeout(() => {
        setFlashVisible(false)
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <div
      className='tooltip__container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {visible && !flashVisible && (
        <div className={`tooltip__popup fade-in ${TOOLTIP_POSITIONS[position]}`}>
          <span className='whitespace-nowrap'>{content}</span>
        </div>
      )}
      {flashVisible && (
        <div className={`tooltip__popup fade-in ${TOOLTIP_POSITIONS[position]}`}>
          <span>{flashMessage}</span>
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
