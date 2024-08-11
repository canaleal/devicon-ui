import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'
import './styles/paginationCard.css'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)

  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={icon.name}
      className={`card ${icon.color === '#fff' ? 'card--dark' : ''}`}
    >
      <img className='card__image' width={30} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='card__title'>{icon.name}</p>
    </button>
  )
}

export default PaginationCard
