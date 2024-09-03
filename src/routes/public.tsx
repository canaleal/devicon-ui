import { DashboardRoutes } from '../features/dashboard/routes'
import NotFound from '../features/misc/routes/NotFound'
import MainLayout from '../components/Layout/MainLayout'

export const publicRoutes = [
  {
    path: '/*',
    element: <MainLayout />,
    children: [
      { path: '/*', element: <DashboardRoutes /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]
