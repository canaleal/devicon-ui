import { BUTTON_STYLES } from '../../../components/Elements/Button/ButtonStyles'
import { Tooltip } from '../../../components/Elements/Tooltip'
import { copyToClipboard } from '../../../helpers/copyToClipboard'

interface TagListProps {
  tags: string[]
  extraClasses?: string
}

export const TagList = ({ tags, extraClasses }: TagListProps) => {
  if (!tags || tags.length === 0) return null
  return (
    <div className={`flex flex-row gap-2 items-center ${extraClasses}`}>
      <Tooltip content='Copy Categories' position='top' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(tags.toString())} className={`${BUTTON_STYLES.base}`}>
          <i className='fa-solid fa-folder'></i>
        </button>
      </Tooltip>
      {tags.map((tag, index) => (
        <span key={index} className='text-sm underline'>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagList
