import InfiniteScroll from "../../../components/Elements/Widgets/InfiniteScroll/InfiniteScroll"
import { ICONS } from "./constants/informationConstants"
import './styles/informationStyle.css'

const InformationSection = () => {
  return (
    <section className='section'>
      <div className='base-container base-container--lg base-container--col'>
        <div className='section-title'>
          <h1 className='section-heading'>Developer Icons, simplified</h1>
          <p className='section-paragraph'>
            Devicon is a comprehensive collection of icons representing development languages and tools. Each icon is
            available in multiple formats, including font and SVG, and offers various styles such as original, plain,
            line, colored, and non-colored versions, with or without wordmarks.
          </p>
        </div>
        <InfiniteScroll items={ICONS} rows={1} itemType='icon' />
      </div>
    </section>
  )
}

export default InformationSection
