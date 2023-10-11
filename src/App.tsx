

import IconPage from './page/IconPage'
import { Footer } from './layout/Footer'
import DarkLightToggle from './components/DarkModeToggle'
import ScrollButton from './components/ScrollButton'

function App() {

  return (
    <>
      <DarkLightToggle />
      <ScrollButton />
      <IconPage />
      <Footer />
    </>
  )
}

export default App
