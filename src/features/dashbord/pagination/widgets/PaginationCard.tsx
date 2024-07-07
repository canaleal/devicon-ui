import { DeviconBranch, IIcon } from '../../../../types'
import { createDeviconIconUrl } from '../../../../helpers/iconUrl'

interface PaginationCardProps {
  icon: IIcon
  deviconBranch: DeviconBranch
  onSelect: (icon: IIcon) => void
}

const CARD_STYLE = {
  base: 'flex flex-col align-middle text-center gap-8 w-full overflow-hidden relative p-8 text-sm border  hover:scale-105 transition-all rounded-md',
  light: 'bg-white  hover:border-frog-800 shadow-md',
  dark: 'dark:bg-dark-900 dark:border-dark-400 dark:hover:border-frog-800'
}

const VERSION_CARD_STYLE = {
  base: 'absolute top-0 right-0 p-2 text-xs rounded-bl-md font-bold',
  primary: 'bg-frog-700 text-white',
  secondary: 'bg-dark-900 text-white'
}

const VersionCountIndicator = ({ count }: { count: number }) => {
  if (count < 5) return null
  return (
    <div
      className={`${VERSION_CARD_STYLE.base} ${count == 6 ? VERSION_CARD_STYLE.primary : VERSION_CARD_STYLE.secondary}`}
    >
      <p className='text-sm'>{count}</p>
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
      className={`${CARD_STYLE.base} ${CARD_STYLE.dark} ${CARD_STYLE.light}`}
    >
      <img className='mx-auto' width={40} height={'auto'} src={iconUrl} alt={icon.name} />
      <p className='text-xs mx-auto'>{icon.name}</p>
      <VersionCountIndicator count={totalVersions} />
    </button>
  )
}

export default PaginationCard
