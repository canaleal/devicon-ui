import InfiniteScroll from '../../../components/Elements/Widgets/InfiniteScroll/InfiniteScroll';
import { ICONS } from './constants/aboutConstants';
import './styles/aboutStyle.css';

const InformationSection = () => {
  return (
    <section className='about-section'>
      <div className='base-container base-container--lg base-container--col'>
        <div className='about-section__title'>
          <h1 className='about-section__heading'>Developer Icons, simplified</h1>
          <p className='about-section__paragraph'>
            Devicon is a comprehensive collection of icons representing development languages and tools. Each icon is
            available in multiple formats, including font and SVG, and offers various styles such as original, plain,
            line, colored, and non-colored versions, with or without wordmarks.
          </p>
        </div>
        <InfiniteScroll items={ICONS} rows={1} itemType='icon' />
      </div>
    </section>
  );
};

export default InformationSection;
