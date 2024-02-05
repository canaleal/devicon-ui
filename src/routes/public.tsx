
import { DashboardRoutes } from "../features/dashbord/routes";
import NotFound from "../features/misc/routes/NotFound";
import MainLayout from "../components/Layout/MainLayout";
import OptimizerPage from "../features/optimizer/routes/OptimizerPage";

export const publicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <DashboardRoutes /> },
      { path: '/optimizer', element: <OptimizerPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];