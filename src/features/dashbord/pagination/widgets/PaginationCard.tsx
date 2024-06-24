import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

const CARD_STYLE = {
  base: 'flex flex-col align-middle text-center rounded-lg w-full overflow-hidden relative p-8 text-sm',
  color: 'border hover:shadow-md transition-shadow'
}

const VERSION_CARD_STYLE = {
  base: 'absolute top-0 right-0 p-2.5 rounded-bl-lg',
  primary: 'bg-frog-600 text-white',
  secondary: 'bg-rose text-white',
}

const VersionCountIndicator = ({ count }: { count: number }) => {
  if (count < 5) return null
  const VERSION_STYLE = `${VERSION_CARD_STYLE.base} ${count == 6 ? VERSION_CARD_STYLE.primary : VERSION_CARD_STYLE.secondary}`
  return (
    <div className={VERSION_STYLE}>
      <p className='text-sm'>{count}</p>
    </div>
  )
}

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)
  const totalVersions = icon.versions.svg.length + icon.aliases.length;

  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={`Select icon: ${icon.name}`}
      className={`${CARD_STYLE.base} ${CARD_STYLE.color}`}
    >
      <img className='mx-auto' width={55} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='text-xs mt-8 mx-auto'>{icon.name}</p>
      <VersionCountIndicator count={totalVersions} />
    </button>
  )
}

export default PaginationCard
