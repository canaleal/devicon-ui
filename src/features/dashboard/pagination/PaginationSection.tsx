import Pagination from './Pagination'
import useIconStore from '../../../store/iconStore'

const PaginationSection = () => {
  const { filteredIcons } = useIconStore()

  return (
    <section className='pagination-section'>
      <div className='base-container base-container--col base-container--md'>
        <Pagination filteredIcons={filteredIcons} />
      </div>
    </section>
  )
}

export default PaginationSection
