import React from 'react';
import { LayoutDashboard, Users, Wrench, UserCircle } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { Screen } from '../../../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  screen: Screen;
  isActive: boolean;
  onClick: (screen: Screen) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, screen, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(screen)}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-dark dark:text-dark-text-secondary hover:text-secondary dark:hover:text-white'}`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const AdminBottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useAppContext();

  const handleNavigation = (screen: Screen) => {
    navigateTo(screen);
  };

  const navItems = [
    { icon: <LayoutDashboard size={24} />, label: "Dashboard", screen: Screen.AdminDashboard },
    { icon: <Wrench size={24} />, label: "Providers", screen: Screen.AdminProviders },
    { icon: <Users size={24} />, label: "Users", screen: Screen.AdminUsers },
    { icon: <UserCircle size={24} />, label: "Profile", screen: Screen.AdminProfile },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center max-w-lg mx-auto">
      {navItems.map(item => (
        <NavItem 
            key={item.screen}
            icon={item.icon}
            label={item.label}
            screen={item.screen}
            isActive={currentScreen === item.screen}
            onClick={handleNavigation}
        />
      ))}
    </footer>
  );
};

export default AdminBottomNav;