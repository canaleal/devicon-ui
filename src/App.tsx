import { AppProvider } from './providers/providers';
import AppRoutes from './routes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
