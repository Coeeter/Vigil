import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';
import { isRegistered } from './socket';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const registered = await isRegistered();
      if (registered && (location.pathname == '/home' || location.pathname == '/')) return;
      if (!registered && location.pathname == '/register-user') return;
      if (!registered) return navigate('/register-user', { replace: true });
      navigate('/home', { replace: true });
    })();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register-user" element={<RegisterUser />} />
    </Routes>
  );
}

export default App;
