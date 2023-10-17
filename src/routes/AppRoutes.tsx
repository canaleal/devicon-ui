import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GalleryPage from '../page/GalleryPage';
import ErrorPage from '../page/ErrorPage';
import SharedLayout from '../page/SharedLayout';
import ExamplePage from '../page/ExamplePage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<GalleryPage />} />
          <Route path="examples" element={<ExamplePage />} /> 
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes