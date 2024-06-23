import { Outlet } from 'react-router-dom'
import ScrollButton from './ScrollButton'
import DarkModeToggle from './DarkModeToggle'
import { Footer } from './Footer'

export const MainLayout = () => {
  return (
    <section>
      <div className='hidden xl:flex'>
        <DarkModeToggle position={'topRight'} />
        <ScrollButton position={'bottomRight'} />
      </div>

      <Outlet />
      <Footer />
    </section>
  )
}

export default MainLayout
