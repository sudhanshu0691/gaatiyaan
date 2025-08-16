import React from 'react';
import { User, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import AnimatedPage from '../shared/AnimatedPage';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Screen } from '../../types';

const ProfileMenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void; children?: React.ReactNode }> = ({ icon, label, onClick, children }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-4 text-left hover:bg-light/50 dark:hover:bg-dark-bg/50 px-2 rounded-md">
    <div className="flex items-center">
      <div className="text-primary mr-4">{icon}</div>
      <span className="text-secondary-dark dark:text-dark-text font-medium">{label}</span>
    </div>
    {children || <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />}
  </button>
);

const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();
  return (
    <div className="flex items-center space-x-2">
      <Sun size={18} className={`text-gray-500 ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`} />
      <button onClick={toggleTheme} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
      <Moon size={18} className={`text-gray-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`} />
    </div>
  );
};

const ProfileScreen: React.FC = () => {
  const { user, logout, navigateTo } = useAppContext();
  
  if (!user) {
    return null;
  }

  return (
    <AnimatedPage className="p-4">
      <div className="flex flex-col items-center mb-8">
        <motion.div whileTap={{ scale: 0.95 }}>
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-dark-card shadow-lg mb-4 bg-primary-dark flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-secondary-dark dark:text-dark-text">{user.name}</h2>
        <p className="text-gray-500 dark:text-dark-text-secondary">{user.phone}</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-2 divide-y divide-gray-100 dark:divide-gray-700">
        <ProfileMenuItem icon={<User size={22} />} label="Account Settings" onClick={() => navigateTo(Screen.AccountSettings)} />
        <ProfileMenuItem icon={<CreditCard size={22} />} label="Payment Methods" />
        <ProfileMenuItem icon={<Moon size={22} />} label="Dark Mode">
            <DarkModeToggle />
        </ProfileMenuItem>
        <ProfileMenuItem icon={<Shield size={22} />} label="Security" />
        <ProfileMenuItem icon={<HelpCircle size={22} />} label="Help & Support" />
      </div>

      <div className="mt-6">
        <button onClick={logout} className="w-full flex items-center justify-center py-3 bg-red-500/10 rounded-lg transition-colors hover:bg-red-500/20">
          <LogOut size={20} className="text-red-500 mr-2" />
          <span className="text-red-500 font-bold">Log Out</span>
        </button>
      </div>
    </AnimatedPage>
  );
};

export default ProfileScreen;