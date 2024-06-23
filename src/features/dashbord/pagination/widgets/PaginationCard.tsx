import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

const CARD_STYLE = {
  base: 'flex flex-col justify-center align-middle text-center rounded-lg w-full overflow-hidden relative p-10 border',
  color: ''
}

const VersionCountIndicator = ({ count }: { count: number }) => {
  if (count <= 4) return null
  return (
    <div className='absolute top-0 right-0 p-2 rounded-bl-lg border'>
      <p className='text-sm'>{count}</p>
    </div>
  )
}

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)
  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={`Select icon: ${icon.name}`}
      className={`${CARD_STYLE.base} first:${CARD_STYLE.color}`}
    >
      <img className='mx-auto' width={55} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='text-sm mt-6 mx-auto'>{icon.name}</p>
      <VersionCountIndicator count={icon.versions.svg.length} />
    </button>
  )
}

export default PaginationCard
