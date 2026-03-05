import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BedProvider }  from './context/BedContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <BedProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BedProvider>
    </AuthProvider>
  );
}
