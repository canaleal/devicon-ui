

import IconGallery from './features/devicon/IconGallery'
import { Footer } from './components/Footer'
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
