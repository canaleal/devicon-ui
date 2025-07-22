import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'
import { ScrollButton } from '../Atoms/FixedButtons'
import { Footer } from './Footer/Footer'
import { Analytics } from "@vercel/analytics/next"


export const MainLayout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
      <ScrollButton position={'bottomRight'} />
      <Footer />
      <Analytics />
    </section>
  )
}

export default MainLayout
