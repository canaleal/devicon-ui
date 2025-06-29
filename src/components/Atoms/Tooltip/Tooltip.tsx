import { useState, useEffect, ReactNode } from 'react'
import './tooltip.css'
import { TooltipPosition, TOOLTIP_POSITIONS } from './tooltipPositions.ts'

export interface TooltipProps {
  children: ReactNode
  content: string
  position: TooltipPosition
  flashMessage?: string
}

export const Tooltip = ({ children, content, position, flashMessage }: TooltipProps) => {
  const [show, setShow] = useState(false)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (!flash) return
    const timer = setTimeout(() => setFlash(false), 2000)
    return () => clearTimeout(timer)
  }, [flash])

  const tooltipText = flash ? flashMessage : content
  const isVisible = show || flash

  return (
    <div
      className='tooltip__container'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => flashMessage && setFlash(true)}
    >
      {isVisible && (
        <div className={`tooltip__popup fade-in ${TOOLTIP_POSITIONS[position]}`}>
          <span className='whitespace-nowrap'>{tooltipText}</span>
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
