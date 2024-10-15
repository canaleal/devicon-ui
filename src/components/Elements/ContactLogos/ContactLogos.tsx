import { CONTACT_LINKS } from './constants'
import './contactLogos.css'
const ContactLogos = () => {
  return (
    <div className='contact-logos '>
      {CONTACT_LINKS.map(({ href, iconClass }, index) => (
        <a key={index} className='contact-logos__link' href={href} target='_blank' rel='noreferrer'>
          <i className={iconClass}></i>
        </a>
      ))}
    </div>
  )
}

export default ContactLogos
