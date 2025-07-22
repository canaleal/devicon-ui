import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'
import { ScrollButton } from '../Atoms/FixedButtons'
import { Footer } from './Footer/Footer'

export const MainLayout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
      <ScrollButton position={'bottomRight'} />
      <Footer />
    </section>
  )
}

export default MainLayout
