import { Outlet } from 'react-router';
import { GameProvider } from '../context/GameContext';

export default function Root() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Outlet />
      </div>
    </GameProvider>
  );
}
