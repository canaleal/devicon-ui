import { copyToClipboard } from '../../../helpers/copyToClipboard'
import { Tooltip } from '../Tooltip'
import '../Button/styles/button.css'

interface ITextBarIcon {
  icon: string
  copyTitle: string
}

export interface TextBarProps {
  title?: string
  icon?: ITextBarIcon
  content: string[]
}

export const TextBar = ({ title, icon, content }: TextBarProps) => {
  if (!content.length) return null
  return (
    <div className='flex flex-row gap-2 items-center text-sm'>
      {title && <span className='font-bold'>{title}:</span>}
      {icon && (
        <Tooltip content={icon.copyTitle} position='top' flashMessage='Copied!'>
          <button onClick={() => copyToClipboard(content.toString())} className="button">
            <i className={icon.icon}></i>
          </button>
        </Tooltip>
      )}
      {content.map((text) => (
        <span key={text} className='underline'>
          {text}
        </span>
      ))}
    </div>
  )
}

export default TextBar
