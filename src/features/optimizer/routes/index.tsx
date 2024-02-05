import { Route, Routes } from 'react-router-dom';
import OptimizerPage from './OptimizerPage';

export const OptimizerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OptimizerPage />} />
    </Routes>
  );
};

