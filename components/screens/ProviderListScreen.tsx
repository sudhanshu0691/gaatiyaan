import React from 'react';
import { Star, Clock, IndianRupee, Zap, RefreshCw } from 'lucide-react';
import { useVans } from '../../hooks/useVans';
import { useAppContext } from '../../context/AppContext';
import { Van } from '../../types';
import { VanCardSkeleton } from '../shared/Skeleton';
import AnimatedPage from '../shared/AnimatedPage';
import { motion } from 'framer-motion';

const VanCard: React.FC<{ van: Van }> = ({ van }) => {
  const { selectVan } = useAppContext();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:shadow-xl transition-shadow duration-300"
      onClick={() => selectVan(van)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-secondary-dark dark:text-dark-text">{van.partnerName}</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{van.vanModel}</p>
          </div>
          <div className="flex items-center bg-primary-dark/10 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light rounded-full px-3 py-1 text-sm font-semibold">
            <Star size={14} className="mr-1 text-primary" />
            <span>{van.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between text-sm text-secondary dark:text-dark-text-secondary">
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-primary" />
            <span>{van.etaMinutes} min</span>
          </div>
          <div className="flex items-center">
            <IndianRupee size={14} className="mr-1 text-primary" />
            <span>{van.pricePerKWh}/kWh</span>
          </div>
          <div className="flex items-center">
            <Zap size={14} className="mr-1 text-primary" />
            <span>{van.capacityKWh}kWh</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProviderListScreen: React.FC = () => {
  const { allProviders, isLoading, error, refreshVans } = useVans();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatedPage className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-secondary-dark dark:text-dark-text">NEARBY VANS</h3>
        <button onClick={refreshVans} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-card transition-colors">
            <RefreshCw size={20} className={`text-secondary dark:text-dark-text ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
      
      <div className="flex-1 overflow-y-auto -mr-4 pr-4">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            {isLoading ? (
                [...Array(4)].map((_, i) => <VanCardSkeleton key={i} />)
            ) : (
                allProviders.filter(p => p.status !== 'pending').map(van => <VanCard key={van.id} van={van} />)
            )}
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default ProviderListScreen;
