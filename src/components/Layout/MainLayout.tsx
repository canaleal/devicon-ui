import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import { DarkModeToggle, ScrollButton } from '../Elements/FixedButtons'
import Footer from './Footer'

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
