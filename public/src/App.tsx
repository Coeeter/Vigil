import { Navigate, Route, Routes } from 'react-router-dom';
import AuthChecker from './components/AuthChecker';
import { SocketProvider } from './components/SocketContext';
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<AuthChecker />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-user" element={<RegisterUser />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
