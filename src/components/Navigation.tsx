import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useApp();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/tips', icon: '💡', label: 'Tips' },
    { path: '/favorites', icon: '⭐', label: 'Saved', badge: favorites.length },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div className="max-w-md mx-auto glass-card rounded-2xl px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? 'gradient-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Badge for favorites count */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-wellness-coral text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
