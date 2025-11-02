import { Logo } from '../../Atoms/Logo/Logo'
import { FOOTER_LINKS } from './constants'
import './footer.css'

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className="base-container footer__container">

        <div className={'footer__left'}>
          <Logo />
          <p className='footer__description'>
            Devicon is a comprehensive collection of icons representing development languages and tools. Each icon is
            available in multiple formats, including font and SVG, and offers various styles such as original, plain,
            line, colored, and non-colored versions, with or without word marks.
          </p>
        </div>
        <div className={'footer__right'}>
          {FOOTER_LINKS.map((section, index) => (
            <div key={index} className='footer__links-section'>
              <p className='footer__link-title'>{section.title}</p>
              {section.links.map((link, linkIndex) => (
                <a key={linkIndex} className='footer__link' href={link.url} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
