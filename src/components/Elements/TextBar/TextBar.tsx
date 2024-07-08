export interface TextBarProps {
  title: string
  content: string[]
}

export const TextBar = ({ title, content }: TextBarProps) => {
  if (!content.length) return null
  return (
    <div className='flex flex-row gap-2 items-center text-sm'>
      <p className='font-bold'>{title}:</p>
      {content.map((text) => (
        <span key={text} className='underline'>
          {text}
        </span>
      ))}
    </div>
  )
}

export default TextBar
