import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';

import { useAuth } from './hooks/useAuth';

export default function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

function ProtectRoutes() {
  const { token } = useAuth() as { token: string };

  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
