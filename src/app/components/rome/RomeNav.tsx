import { Link, useLocation } from 'react-router';
import { Home, BookOpen, Gamepad2, Swords, Scroll, Trophy, GraduationCap } from 'lucide-react';
import { cn } from '../ui/utils';

const navItems = [
  { label: 'Home', path: '/rome', icon: Home },
  { label: 'Learn', path: '/rome/learn', icon: BookOpen },
  { label: 'Play', path: '/rome/play', icon: Gamepad2 },
  { label: 'Arena', path: '/rome/arena', icon: Swords },
  { label: 'Quests', path: '/rome/quests', icon: Scroll },
  { label: 'Heroes', path: '/rome/heroes', icon: Trophy },
  { label: 'Teachers', path: '/rome/teachers', icon: GraduationCap },
];

export default function RomeNav() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/rome" className="text-white font-bold text-2xl flex items-center gap-2">
            <span className="text-3xl">🏛️</span>
            <span>Hero Time! - Rome</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path !== '/rome' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-white text-red-600 font-semibold shadow-lg'
                      : 'text-white hover:bg-white/20'
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path !== '/rome' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-white text-red-600 font-semibold'
                      : 'text-white hover:bg-white/20'
                  )}
                >
                  <Icon className="size-4" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
