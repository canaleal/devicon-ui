const CONTACT_ITEMS = [
  { link: 'https://github.com/devicons/devicon/', title: 'GitHub', icon: 'devicon-github-original' },
  { link: 'https://devicon.dev/', title: 'Devicon', icon: 'devicon-devicon-plain' }
]

interface ContactProps {
  extraClasses?: string
}

const ContactLinks = ({ extraClasses = '' }: ContactProps) => {
  return (
    <div className={`links-container ${extraClasses}`}>
      {CONTACT_ITEMS.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target='_blank'
          rel='noreferrer'
          title={contact.title}
          className='link'
        >
          <span>{contact.title}</span>
        </a>
      ))}
    </div>
  )
}

export default ContactLinks
