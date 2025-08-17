import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../../context/AppContext';
import { Screen } from '../../../types';

import AdminBottomNav from './AdminBottomNav';
import AdminDashboardScreen from './AdminDashboardScreen';
import AdminProvidersScreen from './AdminProvidersScreen';
import AdminUsersScreen from './AdminUsersScreen';
import ProfileScreen from '../ProfileScreen'; // Re-use profile screen for simplicity

const AdminPanel: React.FC = () => {
    const { currentScreen, user } = useAppContext();

    const renderScreen = () => {
        switch(currentScreen) {
            case Screen.AdminProviders:
                return <AdminProvidersScreen key={Screen.AdminProviders} />;
            case Screen.AdminUsers:
                return <AdminUsersScreen key={Screen.AdminUsers} />;
            case Screen.AdminProfile:
                 return <ProfileScreen key={Screen.AdminProfile} />;
            case Screen.AdminDashboard:
            default:
                return <AdminDashboardScreen key={Screen.AdminDashboard} />;
        }
    };

    return (
        <>
            <header className="bg-white dark:bg-dark-card shadow-sm p-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-secondary-dark dark:text-dark-text">Admin Panel</h1>
                <p className="text-sm text-gray-500">Logged in as {user?.name}</p>
            </header>
            <main className="flex-1 overflow-y-auto relative pb-20">
                <AnimatePresence mode="wait">
                    {renderScreen()}
                </AnimatePresence>
            </main>
            <AdminBottomNav />
        </>
    );
};

export default AdminPanel;