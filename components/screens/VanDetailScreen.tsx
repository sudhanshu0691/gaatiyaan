import React from 'react';
import { Star, Zap, Clock, IndianRupee, ShieldCheck, MessageSquare } from 'lucide-react';
import { Van } from '../../types';
import { useAppContext } from '../../context/AppContext';
import AnimatedPage from '../shared/AnimatedPage';
import { motion } from 'framer-motion';

interface VanDetailScreenProps {
  van: Van;
}

const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <div className="text-primary mr-3">{icon}</div>
      <span className="text-secondary dark:text-dark-text-secondary">{label}</span>
    </div>
    <span className="font-semibold text-secondary-dark dark:text-dark-text">{value}</span>
  </div>
);

const VanDetailScreen: React.FC<VanDetailScreenProps> = ({ van }) => {
  const { createBooking } = useAppContext();

  return (
    <AnimatedPage className="flex flex-col h-full">
      <div className="flex-1 bg-white dark:bg-dark-card rounded-t-3xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center mr-4">
             <Zap size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-secondary-dark dark:text-dark-text">{van.partnerName}</h2>
            <p className="text-gray-500 dark:text-dark-text-secondary">{van.vanModel}</p>
          </div>
        </div>

        <div className="my-4 divide-y divide-gray-100 dark:divide-gray-700">
          <DetailRow icon={<Star size={20} />} label="Rating" value={`${van.rating.toFixed(1)} / 5.0`} />
          <DetailRow icon={<Clock size={20} />} label="Est. Arrival" value={`${van.etaMinutes} mins`} />
          <DetailRow icon={<IndianRupee size={20} />} label="Price" value={`₹${van.pricePerKWh} / kWh`} />
          <DetailRow icon={<Zap size={20} />} label="Van Capacity" value={`${van.capacityKWh} kWh`} />
          <DetailRow icon={<ShieldCheck size={20} />} label="Verification" value="GatiYaan Verified" />
        </div>
        
        <div className="mt-auto pt-6">
           <div className="flex items-center bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg mb-4">
                <MessageSquare size={24} className="text-primary-dark mr-3 flex-shrink-0" />
                <input type="text" placeholder="Add optional notes for the partner..." className="bg-transparent focus:outline-none w-full text-sm text-secondary-dark dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-secondary"/>
            </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => createBooking(van)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/30 transition-colors duration-300"
          >
            Confirm Booking
          </motion.button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default VanDetailScreen;