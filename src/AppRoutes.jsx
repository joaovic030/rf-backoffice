import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { PlayerPage } from './features/players/pages/PlayerPage';
import { CreatePlayerPage } from './features/players/pages/CreatePlayerPage';
import { PlayersListPage } from './features/players/pages/PlayersListPage';
import { Header } from './features/shared/components/Header';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route key="/" path="/" element={<LoginPage />} />
        <Route key="/login" path="/login" element={<LoginPage />} />
        <Route key="/players" path="/players" element={<PlayersListPage />} />
        <Route key="/player" path="/player" element={<PlayerPage />} />
        <Route key="/create_player" path="/create_player" element={<CreatePlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
