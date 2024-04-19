import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Room from './pages/Room';
import Lobby from './pages/Lobby';

import { useAuth } from './hooks/useAuth';

export default function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:id" element={<Room />} />
      </Route>
    </Routes>
  );
}

function ProtectRoutes() {
  const { token } = useAuth();

  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
