import DeviconLogo from '../Elements/DeviconLogo/DeviconLogo'

interface FooterItem {
  name: string
  url: string
}

export const Footer = () => {
  const PROJECT_LINKS: FooterItem[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/devicons/devicon/'
    },
    {
      name: 'Devicon.dev',
      url: 'https://devicon.dev/'
    }
  ]

  return (
    <footer className='flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-8  gap-4  border-t border-dark-400 bg-dark-900 text-smoke-100'>
      <div className='flex-1 flex flex-col gap-4'>
        <DeviconLogo />
        <p className='text-sm lg:w-3/5'>
          All product names, logos, and brands are property of their respective owners. All company, product and service
          names used in this website are for identification purposes only.
        </p>
        <div className='flex flex-row gap-2'>
          <div className='w-4 h-4 rounded-full bg-rose' />
          <div className='w-4 h-4 rounded-full bg-orange' />
          <div className='w-4 h-4 rounded-full bg-yellow' />
          <div className='w-4 h-4 rounded-full bg-green' />
          <div className='w-4 h-4 rounded-full bg-cyan' />
          <div className='w-4 h-4 rounded-full bg-frog-600' />
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-4'>
        <p className='text-lg font-extrabold'>Links</p>
        {PROJECT_LINKS.map((link) => (
          <a key={link.name} href={link.url} target='_blank' className='text-sm w-fit'>
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  )
}
