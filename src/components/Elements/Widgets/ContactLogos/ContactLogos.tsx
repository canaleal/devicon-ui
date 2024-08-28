import './contactLogos.css';

const CONTACT_LINKS = [
  {
    href: 'https://github.com/devicons/devicon/',
    iconClass: 'fab fa-github'
  },
  {
    href: 'https://discord.com/invite/hScy8KWACQ',
    iconClass: 'fab fa-discord'
  }
]

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
