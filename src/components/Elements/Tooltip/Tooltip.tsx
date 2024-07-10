import { useState, ReactNode, useEffect } from 'react'

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom'
const TOOLTIP_POSITIONS: Record<TooltipPosition, string> = {
  top: '-top-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}

const TOOLTIPS_STYLE = {
  container: 'flex relative w-fit',
  tooltipBase: 'absolute z-10 px-2 py-1  max-w-xs break-words  shadow-md fade-in rounded-md font-bold text-sm',
  colors: 'bg-frog-800 text-white'
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

  const TOOLTIP_STYLE = `${TOOLTIPS_STYLE.tooltipBase} ${TOOLTIPS_STYLE.colors} ${TOOLTIP_POSITIONS[position]}`

  return (
    <div
      className={TOOLTIPS_STYLE.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {visible && !flashVisible && (
        <div className={`${TOOLTIP_STYLE} ${TOOLTIP_POSITIONS[position]}`}>
          <span className='whitespace-nowrap'>{content}</span>
        </div>
      )}
      {flashVisible && (
        <div className={`${TOOLTIP_STYLE} ${TOOLTIP_POSITIONS[position]}`}>
          <span>{flashMessage}</span>
        </div>
      )}
      {children}
    </div>
  )
}

export default Tooltip
