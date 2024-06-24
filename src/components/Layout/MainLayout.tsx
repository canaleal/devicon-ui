import { Outlet } from 'react-router-dom'
import ScrollButton from '../Elements/FixedButtons/ScrollButton'
import DarkModeToggle from '../Elements/FixedButtons/DarkModeToggle'
import { Footer } from './Footer'
import Navbar from './Navbar'

export const MainLayout = () => {
  return (
    <section>
      <div className='hidden xl:flex'>
        <DarkModeToggle position={'topRight'} />
        <ScrollButton position={'bottomRight'} />
      </div>

      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default MainLayout
