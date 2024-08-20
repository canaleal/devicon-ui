const contactLinks = [
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
    <div className='flex flex-row gap-4 text-xl'>
      {contactLinks.map(({ href, iconClass }, index) => (
        <a
          key={index}
          className='text-gray-400 hover:text-gray-950'
          href={href}
          target='_blank'
          rel='noreferrer'
        >
          <i className={iconClass}></i>
        </a>
      ))}
    </div>
  )
}

export default ContactLogos
