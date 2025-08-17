import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from './context/AppContext';
import { Screen, Role } from './types';

// Main App Screens
import Header from './components/shared/Header';
import BottomNav from './components/shared/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import VanDetailScreen from './components/screens/VanDetailScreen';
import BookingScreen from './components/screens/BookingScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import AccountSettingsScreen from './components/screens/AccountSettingsScreen';
import ProviderListScreen from './components/screens/ProviderListScreen';

// Auth Screens
import WelcomeScreen from './components/screens/WelcomeScreen';
import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';

// Provider Panel
import ProviderPanel from './components/screens/provider/ProviderPanel';

// Admin Panel
import AdminPanel from './components/screens/admin/AdminPanel';


const App: React.FC = () => {
  const { currentScreen, selectedVan, activeBooking, isAuthenticated, user } = useAppContext();

  const renderAuthScreens = () => {
     switch (currentScreen) {
        case Screen.SignIn:
          return <SignInScreen key={Screen.SignIn} />;
        case Screen.SignUp:
          return <SignUpScreen key={Screen.SignUp} />;
        case Screen.Welcome:
        default:
          return <WelcomeScreen key={Screen.Welcome} />;
      }
  };
  
  const renderCustomerScreens = () => {
    // The generic header is only shown on screens that are not the Home screen
    const showHeader = currentScreen !== Screen.Home;
    const screenToRender = () => {
        switch (currentScreen) {
          case Screen.Home:
            return <HomeScreen key={Screen.Home} />;
          case Screen.ProviderList:
            return <ProviderListScreen key={Screen.ProviderList} />;
          case Screen.VanDetail:
            return selectedVan ? <VanDetailScreen key={Screen.VanDetail} van={selectedVan} /> : <HomeScreen key="fallback-home" />;
          case Screen.Booking:
            return activeBooking ? <BookingScreen key={Screen.Booking} booking={activeBooking} /> : <HomeScreen key="fallback-home-2"/>;
          case Screen.History:
            return <HistoryScreen key={Screen.History} />;
          case Screen.Profile:
            return <ProfileScreen key={Screen.Profile} />;
          case Screen.AccountSettings:
            return <AccountSettingsScreen key={Screen.AccountSettings} />;
          default:
            return <HomeScreen key={Screen.Home} />;
        }
    };

    return (
        <>
            {showHeader && <Header />}
            <main className={`flex-1 overflow-y-auto relative pb-20`}>
                <AnimatePresence mode="wait">
                {screenToRender()}
                </AnimatePresence>
            </main>
            <BottomNav />
        </>
    );
  };

  const renderContent = () => {
      if (!isAuthenticated || !user) {
          return (
             <main className="flex-1 overflow-y-auto relative">
                <AnimatePresence mode="wait">
                    {renderAuthScreens()}
                </AnimatePresence>
            </main>
          );
      }
      
      switch(user.role) {
          case Role.ADMIN:
              return <AdminPanel />;
          case Role.PROVIDER:
              return <ProviderPanel />;
          case Role.USER:
          default:
              return renderCustomerScreens();
      }
  };

  return (
    <div className="h-screen w-screen bg-light dark:bg-dark-bg font-sans flex flex-col max-w-lg mx-auto shadow-2xl">
      {renderContent()}
    </div>
  );
};

export default App;