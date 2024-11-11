import Logo from '../../Elements/Logo/Logo'
import { FOOTER_LINKS } from './constants'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className={"base-container footer__container"}>
        <div className={"footer__left"}>
          <Logo />
        </div>
        <div className={"footer__right"}>
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

export default Footer
