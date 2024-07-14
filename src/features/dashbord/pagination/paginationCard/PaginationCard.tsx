import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'
import './styles/paginationCard.css'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

const VersionCountIndicator = ({ count }: { count: number }) => {
  if (count < 5) return null
  const indicatorStyle = count === 6 ? "card__version-mark--primary" : "card__version-mark--secondary";
  return (
    <div className={`card__version-mark { ${indicatorStyle}`}>
      <p className='text-xs'>{count}</p>
    </div>
  )
}

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)
  const totalVersions = icon.versions.svg.length + icon.aliases.length

  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={`Select icon: ${icon.name}`}
      className="card"
    >
      <img className='mx-auto' width={40} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='text-xs mx-auto'>{icon.name}</p>
      <VersionCountIndicator count={totalVersions} />
    </button>
  )
}

export default PaginationCard
