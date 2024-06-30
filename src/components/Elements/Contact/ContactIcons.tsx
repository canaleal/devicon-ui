import React from 'react'

const CONTACT_ICON_BUTTON_STYLE = {
  base: 'flex flex-col gap-4 w-fit',
  item: 'hover:text-frog-800 text-sm transition-all'
}

const CONTACT_ITEMS = [
  { link: 'https://github.com/devicons/devicon/', title: 'GitHub', icon: 'devicon-github-original' },
  { link: 'https://devicon.dev/', title: 'Devicon', icon: 'devicon-devicon-plain' }
]

interface ContactIconsProps {
  extraClasses?: string
}

const ContactIcons: React.FC<ContactIconsProps> = ({ extraClasses = '' }) => {
  return (
    <div className={`${CONTACT_ICON_BUTTON_STYLE.base} ${extraClasses}`}>
      {CONTACT_ITEMS.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target='_blank'
          rel='noreferrer'
          title={contact.title}
          className={CONTACT_ICON_BUTTON_STYLE.item}
        >
          <p>{contact.title}</p>
        </a>
      ))}
    </div>
  )
}

export default ContactIcons
