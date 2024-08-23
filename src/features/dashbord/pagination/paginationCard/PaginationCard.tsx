import { IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'
import './styles/paginationCard.css'
import useStore from '../../../../store/iconStore'

interface PaginationCardProps {
  icon: IIcon
}

export const PaginationCard = ({ icon }: PaginationCardProps) => {
  const deviconBranch = useStore((state) => state.deviconBranch)
  const setSelectedIcon = useStore((state) => state.setSelectedIcon)
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)

  return (
    <button
      onClick={() => setSelectedIcon(icon)}
      aria-label={icon.name}
      className={`card ${icon.color === '#fff' ? 'card--dark' : ''}`}
    >
      <img className='card__image' width={30} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='card__title'>{icon.name}</p>
    </button>
  )
}

export default PaginationCard
