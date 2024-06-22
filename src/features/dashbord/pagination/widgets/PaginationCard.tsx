import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

const CARD_STYLE = {
  base: 'flex flex-col justify-center align-middle text-center rounded-lg w-full overflow-hidden relative shadow-md p-8',
  border: 'border dark:border-dark-500',
  color: 'bg-white hover:bg-dark-100 dark:bg-dark-900 dark:hover:bg-dark-600 dark:text-white'
}

const VersionCountIndicator = ({ count }: { count: number }) => {
  if (count <= 4) return null
  return (
    <div className='absolute top-0 right-0 bg-primary-600 text-white p-2 rounded-bl-lg'>
      <p className='text-sm'>{count}</p>
    </div>
  )
}

const CardImage = ({ icon, iconUrl }: { icon: IIcon, iconUrl: string }) => (
  <>
    <img className='mx-auto' width={55} height={'auto'} src={iconUrl} alt={icon.name} />
    <p className='text-sm mt-6 mx-auto'>{icon.name}</p>
  </>
)

export const PaginationCard = ({ icon, deviconBranch, onSelect }: PaginationCardProps) => {
  const iconUrl = createDeviconIconUrl(icon.name, icon.versions.svg[0], deviconBranch)

  return (
    <button
      onClick={() => onSelect(icon)}
      aria-label={`Select icon: ${icon.name}`}
      className={`${CARD_STYLE.base} ${CARD_STYLE.border} ${CARD_STYLE.color}`}
    >
      <CardImage icon={icon} iconUrl={iconUrl} />
      <VersionCountIndicator count={icon.versions.svg.length} />
    </button>
  )
}

export default PaginationCard
