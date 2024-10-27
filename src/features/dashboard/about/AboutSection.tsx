import InfiniteScroll from '../../../components/Elements/InfiniteScroll/InfiniteScroll'
import { ICONS } from './constants/aboutConstants'
import './styles/aboutStyle.css'
import { CDNBlockLink } from './cdnBlockLink/CDNBlockLink.tsx'

const InformationSection = () => {
  return (
    <section className='about-section'>
      <div className='base-container base-container--lg base-container--col '>
        <div className='about-section__header'>
          <h1 className='about-section__title'>Developer Icons, simplified</h1>
          <p className='about-section__paragraph'>
            Devicon is a comprehensive collection of icons representing development languages and tools. Each icon is
            available in multiple formats, including font and SVG, and offers various styles such as original, plain,
            line, colored, and non-colored versions, with or without word marks.
          </p>
        </div>
        <InfiniteScroll items={ICONS} rows={1} itemType='icon' />
        <CDNBlockLink />
      </div>
    </section>
  )
}

export default InformationSection
