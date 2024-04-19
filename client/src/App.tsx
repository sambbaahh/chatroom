import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Room from './pages/Room';
import Lobby from './pages/Lobby';

export default function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Lobby />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
}
