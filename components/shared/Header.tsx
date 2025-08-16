import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Screen } from '../../types';

const Header: React.FC = () => {
    const { currentScreen, navigateBack, canGoBack } = useAppContext();
    
    const screenTitles: { [key in Screen]?: string } = {
        [Screen.ProviderList]: 'Nearby Vans',
        [Screen.VanDetail]: 'Van Details',
        [Screen.Booking]: 'Live Tracking',
        [Screen.History]: 'Booking History',
        [Screen.Profile]: 'My Profile',
        [Screen.AccountSettings]: 'Account Settings',
    };

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm p-4 flex items-center z-10 sticky top-0">
        {canGoBack && (
            <button onClick={navigateBack} className="p-2 rounded-full hover:bg-light dark:hover:bg-dark-bg mr-2">
                <ArrowLeft size={24} className="text-secondary dark:text-dark-text" />
            </button>
        )}
        <h1 className="text-xl font-bold text-secondary-dark dark:text-dark-text tracking-tight">
            {screenTitles[currentScreen] || 'GatiYaan'}
        </h1>
    </header>
  );
};

export default Header;