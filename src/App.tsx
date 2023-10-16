

import IconPage from './page/IconPage'
import { Footer } from './components/Layout/Footer'
import DarkLightToggle from './components/Elements/DarkModeToggle'
import ScrollButton from './components/Elements/ScrollButton'

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
