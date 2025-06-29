import './textBar.css'

export interface TextBarProps {
  title: string
  content: string[]
  extraClasses?: string
}

export const TextBar = ({ title, content, extraClasses }: TextBarProps) => {
  if (!content.length) return null

  return (
    <div className={`text-bar ${extraClasses}`}>
      <span className='text-bar__title'>{title}:</span>
      {content.map((text) => (
        <span key={text} className='text-bar__content'>
          {text}
        </span>
      ))}
    </div>
  )
}
