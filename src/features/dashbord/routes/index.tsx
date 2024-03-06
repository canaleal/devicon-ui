import { Route, Routes } from 'react-router-dom';
import GalleryPage from './GalleryPage';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<GalleryPage />} />
    </Routes>
  );
};

