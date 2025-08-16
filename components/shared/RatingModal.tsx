import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, bookingId }) => {
  const { rateBooking } = useAppContext();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      rateBooking(bookingId, rating);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-sm"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-secondary-dark dark:text-dark-text">Rate Your Service</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-light dark:hover:bg-dark-bg">
                <X size={20} className="text-gray-500 dark:text-dark-text-secondary" />
              </button>
            </div>
            <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">How was your experience?</p>
                <div 
                    className="flex justify-center space-x-2 mb-6"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        return (
                            <motion.div
                                key={starValue}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Star 
                                    size={36} 
                                    className={`cursor-pointer transition-colors ${starValue <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                />
                            </motion.div>
                        )
                    })}
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Submit Rating
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;