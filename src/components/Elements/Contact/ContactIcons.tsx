import React from 'react'

const CONTACT_ITEMS = [
  { link: 'https://github.com/devicons/devicon/', title: 'GitHub', icon: 'devicon-github-original' },
  { link: 'https://devicon.dev/', title: 'Devicon', icon: 'devicon-devicon-plain' }
]

interface ContactIconsProps {
  extraClasses?: string
}

const ContactIcons: React.FC<ContactIconsProps> = ({ extraClasses = '' }) => {
  return (
    <div className={`flex flex-col gap-4 w-fit text-sm ${extraClasses}`}>
      {CONTACT_ITEMS.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target='_blank'
          rel='noreferrer'
          title={contact.title}
          className="hover:text-frog-800 transition-all"
        >
          <p>{contact.title}</p>
        </a>
      ))}
    </div>
  )
}

export default ContactIcons
