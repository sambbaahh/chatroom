import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/auth/login';
import Register from './pages/auth/register';
import MainPage from './pages/main/main-page';
import Header from './components/header/header';
import { useAuth } from './hooks/use-auth';
import { Box, Container } from '@mantine/core';

import classes from './app.module.css';

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
    <Container size="xl" className={classes.container}>
      <Box className={classes.headerWrapper}>
        <Header />
      </Box>
      <Box className={classes.outletWrapper}>
        <Outlet />
      </Box>
    </Container>
  );
}
