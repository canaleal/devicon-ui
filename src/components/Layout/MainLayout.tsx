import { Outlet } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import { ScrollButton } from '../Elements/Widgets/FixedButtons'
import Footer from './Footer/Footer'

export const MainLayout = () => {
  return (
    <section>
      <ScrollButton position={'bottomRight'} />
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default MainLayout
