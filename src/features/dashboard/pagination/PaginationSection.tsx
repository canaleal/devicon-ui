import Pagination from './Pagination'
import { CDNBlockLink } from './widgets/cdnBlockLink/CDNBlockLink'
import useIconStore from '../../../store/iconStore'

const PaginationSection = () => {
  const { filteredIcons } = useIconStore()

  return (
    <section className='bg-gray-50 dark:bg-dark-900'>
      <div className='base-container base-container--col'>
        <CDNBlockLink />
        <div className='base-container__card'>
          <Pagination filteredIcons={filteredIcons} />
        </div>
      </div>
    </section>
  )
}

export default PaginationSection
