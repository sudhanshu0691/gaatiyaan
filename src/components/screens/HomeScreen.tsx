import React from 'react';
import { MapPin, ChevronDown, Search, Zap, Users, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Screen } from '../../types';
import AnimatedPage from '../shared/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';

const HomeHeader: React.FC = () => {
  const { user } = useAppContext();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <MapPin size={24} className="text-primary" />
        <div className="ml-2">
          <div className="flex items-center">
             <h2 className="font-bold text-lg text-secondary-dark dark:text-dark-text">{user?.name.split(' ')[0] || 'GatiYaan'}</h2>
             <ChevronDown size={20} className="ml-1 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Bengaluru, Karnataka</p>
        </div>
      </div>
       <button className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white font-bold text-lg">
          {user?.name.charAt(0).toUpperCase()}
       </button>
    </div>
  );
}

const SearchBar: React.FC = () => (
  <div className="relative mt-4">
    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
    <input 
      type="text"
      placeholder="Search for 'Fast Charger'"
      className="w-full bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
    />
  </div>
);

const PromoCard: React.FC = () => {
    const { user } = useAppContext();
    return (
        <div className="mt-6 bg-gradient-to-r from-secondary-dark to-secondary p-4 rounded-xl text-white flex items-center justify-between">
            <div>
                <p className="font-bold text-lg">{user?.name.split(' ')[0]}, need a boost?</p>
                <p className="text-sm opacity-80">Get 10% off your next charge. </p>
            </div>
            <button className="bg-primary hover:bg-primary-dark font-bold px-5 py-2 rounded-lg transition-colors">
                Avail Now
            </button>
        </div>
    );
};

const ServiceCard: React.FC<{title: string, subtitle: string, icon: React.ReactNode, bgColor: string, onClick?: () => void}> = ({title, subtitle, icon, bgColor, onClick}) => (
    <button onClick={onClick} className={`${bgColor} p-4 rounded-xl relative overflow-hidden h-40 flex flex-col justify-end text-left w-full hover:scale-105 transition-transform duration-300`}>
        <div className="absolute -right-4 -top-4 text-black/10 dark:text-white/10">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-secondary-dark dark:text-dark-text">{title}</h3>
        <p className="text-xs text-secondary/80 dark:text-dark-text-secondary font-semibold uppercase">{subtitle}</p>
    </button>
);

const BookingFAB: React.FC = () => {
    const { activeBooking, navigateTo } = useAppContext();
    if (!activeBooking) return null;
    
    return (
        <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(512px-2rem)] z-20"
        >
            <button 
                onClick={() => navigateTo(Screen.Booking)}
                className="w-full bg-secondary-dark dark:bg-primary-dark text-white p-4 rounded-lg shadow-2xl flex items-center justify-between"
            >
                <div className="flex items-center">
                    <div className="relative mr-3">
                         <img src="https://i.imgur.com/z40N9tA.png" alt="EV Van" className="w-8 h-8"/>
                         <motion.div
                            className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-primary"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div className="text-left">
                        <p className="font-bold">Partner is on the way!</p>
                        <p className="text-sm opacity-80">{activeBooking.van.partnerName} - {activeBooking.van.etaMinutes} min away</p>
                    </div>
                </div>
                <ChevronRight size={24} />
            </button>
        </motion.div>
    );
}

const HomeScreen: React.FC = () => {
  const { activeBooking, navigateTo } = useAppContext();

  return (
    <AnimatedPage className="p-4 flex flex-col h-full">
      <HomeHeader />
      <SearchBar />
      
      {!activeBooking && <PromoCard />}

      <div className="my-6">
        <h3 className="font-bold text-xl text-secondary-dark dark:text-dark-text mb-4">Our Services</h3>
        <div className="grid grid-cols-2 gap-4">
            <ServiceCard 
              title="Mobile Charging" 
              subtitle="FROM VERIFIED PARTNERS" 
              icon={<Zap size={120} />} 
              bgColor="bg-primary/20"
              onClick={() => navigateTo(Screen.ProviderList)} 
            />
            <ServiceCard 
              title="Community Help" 
              subtitle="GET HELP FROM OTHERS" 
              icon={<Users size={120} />} 
              bgColor="bg-gray-200 dark:bg-gray-700" 
              onClick={() => alert('Community Help feature coming soon!')}
            />
      </div>
      </div>
      
       <div className="mt-auto">
          <h3 className="font-bold text-xl text-secondary-dark dark:text-dark-text mb-4">Past Bookings</h3>
          <p className="text-center text-gray-500 p-4">Your recent orders will appear here.</p>
       </div>


      <AnimatePresence>
        {activeBooking && <BookingFAB />}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default HomeScreen;