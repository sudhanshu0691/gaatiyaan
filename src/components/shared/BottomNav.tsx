import React from 'react';
import { Home, ClipboardList, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Screen } from '../../types';

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

const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, activeBooking } = useAppContext();

  // Hide nav during active booking to focus the user on tracking
  if (currentScreen === Screen.Booking) return null;

  const handleNavigation = (screen: Screen) => {
    navigateTo(screen);
  };
  
  const isHistoryActive = currentScreen === Screen.History;
  const isProfileActive = currentScreen === Screen.Profile || currentScreen === Screen.AccountSettings;
  const isHomeActive = !isHistoryActive && !isProfileActive;


  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center max-w-lg mx-auto">
      <NavItem icon={<Home size={24} />} label="Home" screen={Screen.Home} isActive={isHomeActive} onClick={handleNavigation} />
      <NavItem icon={<ClipboardList size={24} />} label="History" screen={Screen.History} isActive={isHistoryActive} onClick={handleNavigation} />
      <NavItem icon={<User size={24} />} label="Profile" screen={Screen.Profile} isActive={isProfileActive} onClick={handleNavigation} />
    </footer>
  );
};

export default BottomNav;