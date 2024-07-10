import { Outlet } from 'react-router-dom'
import ScrollButton from '../Elements/FixedButtons/ScrollButton'
import DarkModeToggle from '../Elements/FixedButtons/DarkModeToggle'
import { Footer } from './Footer'
import Navbar from './Navbar'

export const MainLayout = () => {
  return (
    <section className='flex flex-col min-h-screen'>
      <DarkModeToggle position={'topRight'} />
      <ScrollButton position={'bottomRight'} />

      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default MainLayout
