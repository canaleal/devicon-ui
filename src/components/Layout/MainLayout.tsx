import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import Navbar from './Navbar'
import { DarkModeToggle, ScrollButton } from '../Elements/FixedButtons'

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
