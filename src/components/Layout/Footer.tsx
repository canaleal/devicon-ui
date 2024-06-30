import ContactIcons from '../Elements/Contact/ContactIcons'
import DeviconLogo from '../Elements/DeviconLogo/DeviconLogo'

export const Footer = () => {
  return (
    <footer className='flex-auto flex flex-col xl:flex-row px-8 md:px-12 lg:px-24 py-8 pb-24  gap-8  border-t border-dark-400 bg-dark-900 text-smoke-100'>
      <div className='flex-1 flex flex-col gap-4'>
        <DeviconLogo />
        <div className='flex flex-row gap-2'>
          <div className='w-4 h-4 rounded-full bg-rose' />
          <div className='w-4 h-4 rounded-full bg-orange' />
          <div className='w-4 h-4 rounded-full bg-yellow' />
          <div className='w-4 h-4 rounded-full bg-frog-700' />
          <div className='w-4 h-4 rounded-full bg-cyan' />
          <div className='w-4 h-4 rounded-full bg-purple' />
        </div>
        <p className='text-sm lg:w-3/5 mb-2'>
          All product names, logos, and brands are property of their respective owners. All company, product and service
          names used in this website are for identification purposes only.
        </p>
      </div>

      <div className='flex-1 flex flex-col gap-4'>
        <p className='text-lg font-bold'>Links</p>
        <ContactIcons />
      </div>
    </footer>
  )
}
