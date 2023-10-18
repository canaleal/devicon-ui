import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GalleryPage from '../pages/GalleryPage';
import ErrorPage from '../pages/ErrorPage';
import SharedLayout from '../pages/SharedLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<GalleryPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes