import ContactLogos from '../../Elements/Widgets/ContactLogos/ContactLogos'
import Logo from '../../Elements/Widgets/Logo/Logo'
import './footer.css'

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { name: 'Read Me', url: 'https://github.com/devicons/devicon/?tab=readme-ov-file#readme' },
      { name: 'Github License', url: 'https://github.com/devicons/devicon/?tab=MIT-1-ov-file#readme' },
      { name: 'Releases', url: 'https://github.com/devicons/devicon/releases' }
    ]
  },
  {
    title: 'Community',
    links: [{ name: 'Discord', url: 'https://discord.com/invite/hScy8KWACQ' }]
  }
]

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-grid'>
          <div className='footer-logo-section'>
            <Logo />
          </div>
          {FOOTER_LINKS.map((section, index) => (
            <div key={index} className='footer-links'>
              <p>{section.title}</p>
              {section.links.map((link, linkIndex) => (
                <a key={linkIndex} href={link.url} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className='footer-bottom'>
          <p>© 2024 Devicon. All rights reserved.</p>
          <ContactLogos />
        </div>
      </div>
    </footer>
  )
}

export default Footer
