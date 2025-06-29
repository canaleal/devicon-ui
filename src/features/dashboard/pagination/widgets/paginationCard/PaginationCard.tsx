import { IIcon } from '../../../../../types'
import { createDeviconIconUrl } from '../../../../../helpers/iconUrl'
import useStore from '../../../../../store/iconStore'
import './paginationCard.css'

interface PaginationCardProps {
  icon: IIcon
}

export const PaginationCard = ({ icon }: PaginationCardProps) => {
  const { deviconBranch, setSelectedIcon } = useStore((state) => ({
    deviconBranch: state.deviconBranch,
    setSelectedIcon: state.setSelectedIcon
  }))

  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)
  const isDark = icon.color === '#fff'

  return (
    <button
      onClick={() => setSelectedIcon(icon)}
      aria-label={icon.name}
      className={`card${isDark ? ' card--dark' : ''}`}
    >
      <img className='card__image' src={iconUrl} width={30} height='auto' alt={icon.name} />
      <p className='card__title'>{icon.name}</p>
    </button>
  )
}

export default PaginationCard
