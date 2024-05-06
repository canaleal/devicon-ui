import { Outlet } from 'react-router-dom';
import ScrollButton from '../Elements/ScrollButton/ScrollButton';
import DarkModeToggle from './DarkModeToggle';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <section>
      <DarkModeToggle position={'topRight'} />
      <ScrollButton position={'bottomRight'} />

      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
