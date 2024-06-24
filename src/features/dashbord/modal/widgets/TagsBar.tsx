import { Tooltip } from '../../../../components/Elements/Tooltip'
import { copyToClipboard } from '../../../../helpers/copyToClipboard'

interface TagBarProps {
  tags: string[]
  extraClasses?: string
}

const TagsContainer = ({ tags }: TagBarProps) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span key={index} className='text-sm underline my-auto ml-2'>
          {tag}
        </span>
      ))}
    </>
  )
}

export const TagsBar = ({ tags, extraClasses }: TagBarProps) => {
  if (!tags || tags.length === 0) return null
  return (
    <div className={`flex flex-row ${extraClasses}`}>
      <Tooltip content='Copy Categories' position='top' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(tags.toString())} className='p-2 flex'>
          <i className='fa-solid fa-folder'></i>
        </button>
      </Tooltip>
      <TagsContainer tags={tags} />
    </div>
  )
}

export default TagsBar
