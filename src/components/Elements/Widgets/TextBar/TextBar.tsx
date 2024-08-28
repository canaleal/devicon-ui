import { copyToClipboard } from '../../../../helpers/copyToClipboard'
import { Tooltip } from '../Tooltip'
import '../Button/button.css'
import './style/textBar.css'

export interface TextBarProps {
  title?: string
  icon?: {
    icon: string
    copyTitle: string
  }
  content: string[]
}

export const TextBar = ({ title, icon, content }: TextBarProps) => {
  if (!content.length) return null

  const handleCopy = () => icon && copyToClipboard(content.join(', '))

  return (
    <div className='text-bar'>
      {title && <span className='text-bar__title'>{title}:</span>}
      {icon && (
        <Tooltip content={icon.copyTitle} position='top' flashMessage='Copied!'>
          <button onClick={handleCopy} className='button button--icon'>
            <i className={icon.icon}></i>
          </button>
        </Tooltip>
      )}
      {content.map((text) => (
        <span key={text} className='text-bar__content'>
          {text}
        </span>
      ))}
    </div>
  )
}

export default TextBar
