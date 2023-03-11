import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { PlayersListPage } from './features/players/pages/PlayersListPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/players" element={<PlayersListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
