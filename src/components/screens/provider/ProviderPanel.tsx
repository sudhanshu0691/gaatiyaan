import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../../context/AppContext';
import { Screen } from '../../../types';

import ProviderBottomNav from './ProviderBottomNav';
import ProviderDashboardScreen from './ProviderDashboardScreen';
import ProviderProfileScreen from './ProviderProfileScreen';

const ProviderPanel: React.FC = () => {
    const { currentScreen, user } = useAppContext();

    const renderScreen = () => {
        switch(currentScreen) {
            case Screen.ProviderProfile:
                 return <ProviderProfileScreen key={Screen.ProviderProfile} />;
            case Screen.ProviderDashboard:
            default:
                return <ProviderDashboardScreen key={Screen.ProviderDashboard} />;
        }
    };

    return (
        <>
            <header className="bg-white dark:bg-dark-card shadow-sm p-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-secondary-dark dark:text-dark-text">Provider Panel</h1>
                <p className="text-sm text-gray-500">Logged in as {user?.name}</p>
            </header>
            <main className="flex-1 overflow-y-auto relative pb-20">
                <AnimatePresence mode="wait">
                    {renderScreen()}
                </AnimatePresence>
            </main>
            <ProviderBottomNav />
        </>
    );
};

export default ProviderPanel;