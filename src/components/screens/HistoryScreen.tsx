import React, { useState } from 'react';
import { CheckCircle, XCircle, ListX, Star } from 'lucide-react';
import AnimatedPage from '../shared/AnimatedPage';
import { useAppContext } from '../../context/AppContext';
import { Booking } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import RatingModal from '../shared/RatingModal';

const HistoryCard: React.FC<{ item: Booking }> = ({ item }) => {
    const isCompleted = item.status === 'completed';
    const [isRatingModalOpen, setRatingModalOpen] = useState(false);

    return (
        <>
        <RatingModal 
          isOpen={isRatingModalOpen}
          onClose={() => setRatingModalOpen(false)}
          bookingId={item.id}
        />
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-bold text-secondary-dark dark:text-dark-text">{item.van.partnerName}</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{item.bookingTime.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className={`font-bold text-lg ${isCompleted ? 'text-secondary-dark dark:text-dark-text' : 'text-gray-400 dark:text-gray-500'}`}>
                        {isCompleted ? `₹${(item.finalCost || 0).toFixed(2)}` : 'Cancelled'}
                    </p>
                    <div className={`flex items-center justify-end text-sm mt-1 ${isCompleted ? 'text-green-500' : 'text-red-500'}`}>
                        {isCompleted ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                        <span className="capitalize">{item.status}</span>
                    </div>
                </div>
            </div>
             {isCompleted && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {item.userRating ? (
                        <div className="flex items-center">
                            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mr-2">Your rating:</p>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={i < item.userRating! ? "text-yellow-400 fill-current" : "text-gray-300"} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setRatingModalOpen(true)} className="text-sm font-semibold text-primary hover:underline">
                            Rate Service
                        </button>
                    )}
                </div>
            )}
        </motion.div>
        </>
    );
};

const HistoryScreen: React.FC = () => {
  const { bookingHistory } = useAppContext();
  
  return (
    <AnimatedPage className="p-4">
      <AnimatePresence>
        {bookingHistory.length > 0 ? (
          <motion.div className="space-y-3">
            {bookingHistory.map((item) => <HistoryCard key={item.id} item={item} />)}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-dark-text-secondary"
          >
              <ListX size={48} className="mb-4 text-gray-400 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-secondary-dark dark:text-dark-text">No History Yet</h3>
              <p>Your past bookings will appear here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default HistoryScreen;