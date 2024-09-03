import { Route, Routes } from 'react-router-dom'
import GalleryPage from './galleryPage/GalleryPage'

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path='/*' element={<GalleryPage />} />
    </Routes>
  )
}
