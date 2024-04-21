import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MainPage from './pages/main/MainPage';
import Header from './components/header/Header';
import { useAuth } from './hooks/useAuth';
import { Box, Container } from '@mantine/core';

export default function App(): React.ReactElement {
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

  return <RenderRoute />;
}

function RenderRoute() {
  return (
    <Container size="xl">
      <Box style={{ height: '4rem' }}>
        <Header />
      </Box>
      <Box style={{ height: 'calc(100vh - 4rem)' }}>
        <Outlet />
      </Box>
    </Container>
  );
}
