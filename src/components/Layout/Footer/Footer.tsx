import ContactLogos from '../../Elements/ContactLogos/ContactLogos'
import Logo from '../../Elements/Logo/Logo'
import { FOOTER_LINKS } from './constants'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <div className='footer__grid'>
          <div className='footer__logo-section'>
            <Logo />
          </div>
          {FOOTER_LINKS.map((section, index) => (
            <div key={index} className='footer__links'>
              <p className='footer__links__heading'>{section.title}</p>
              {section.links.map((link, linkIndex) => (
                <a key={linkIndex} className='footer__links__link' href={link.url} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className='footer__bottom'>
          <p className='footer__bottom__text'>© 2024 Devicon. All rights reserved.</p>
          <ContactLogos />
        </div>
      </div>
    </footer>
  )
}

export default Footer
