import { Tooltip } from '../../../../components/Elements/Tooltip'
import { copyToClipboard } from '../../../../helpers/copyToClipboard'

interface TagBarProps {
  tags: string[]
}

export const TagsBar = ({ tags }: TagBarProps) => {
  if (!tags || tags.length === 0) return null
  return (
    <div className='flex flex-row'>
      <Tooltip content='Copy Categories' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(tags.toString())} className='p-2 flex'>
          <i className='fa-solid fa-folder'></i>
        </button>
      </Tooltip>
      {tags.map((tag, index) => (
        <span key={index} className='text-sm underline my-auto ml-2'>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagsBar
