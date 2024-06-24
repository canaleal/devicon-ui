import { useState, ReactNode, useEffect } from 'react'

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom'
const TOOLTIP_POSITIONS: Record<TooltipPosition, string> = {
  top: '-top-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}

const TOOLTIPS_STYLE = {
  base: 'flex relative w-fit',
  tooltip: 'absolute z-10 px-2 py-1 rounded-lg max-w-xs break-words border shadow-md fade-in',
  lightTooltip: 'border-dark-400 bg-frog-800 text-smoke-100'
}

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

  let timeoutId: number | null = null // Change the type to number

  const handleClick = () => {
    if (flashMessage) {
      setFlashVisible(true)
      timeoutId = window.setTimeout(() => {
        // Use window.setTimeout for clarity, though it's optional
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

  const TOOLTIP_STYLE = `${TOOLTIPS_STYLE.tooltip} ${TOOLTIPS_STYLE.lightTooltip} ${TOOLTIP_POSITIONS[position]}`

  return (
    <div
      className={TOOLTIPS_STYLE.base}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {visible && !flashVisible && (
        <div className={`${TOOLTIP_STYLE} ${TOOLTIP_POSITIONS[position]}`}>
          <p className='whitespace-nowrap'>{content}</p>
        </div>
      )}
      {flashVisible && (
        <div className={`${TOOLTIP_STYLE} ${TOOLTIP_POSITIONS[position]}`}>
          <p>{flashMessage}</p>
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
