import { Outlet } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import {  ScrollButton } from '../Elements/FixedButtons'
import Footer from './Footer/Footer'

export const MainLayout = () => {
  return (
    <section className='flex flex-col min-h-screen'>
     
      <ScrollButton position={'bottomRight'} />

      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default MainLayout
