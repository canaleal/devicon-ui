

import IconGallery from './page/IconGallery'
import { Footer } from './layout/Footer'
import DarkLightToggle from './components/DarkModeToggle'
import ScrollButton from './components/ScrollButton'

function App() {

  return (
    <>
      <DarkLightToggle />
      <ScrollButton />
      <IconGallery />
      <Footer />
    </>
  )
}

export default App
