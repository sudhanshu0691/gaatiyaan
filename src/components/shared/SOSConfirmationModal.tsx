import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SOSConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SOSConfirmationModal: React.FC<SOSConfirmationModalProps> = ({ isOpen, onClose }) => {

  const handleConfirm = () => {
    // In a real app, this would trigger an emergency protocol.
    alert("Emergency alert sent! Support has been notified.");
    onClose();
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
              <h2 className="text-lg font-semibold text-red-600 flex items-center">
                <ShieldAlert size={22} className="mr-2" />
                Confirm SOS
              </h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-light dark:hover:bg-dark-bg">
                <X size={20} className="text-gray-500 dark:text-dark-text-secondary" />
              </button>
            </div>
            <div className="p-6">
                <p className="text-center text-gray-600 dark:text-dark-text-secondary mb-6">Are you sure you want to send an emergency alert? This will notify our support team and local authorities immediately.</p>
                <div className="flex space-x-4">
                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-dark-text font-bold py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-700 transition-colors"
                    >
                        Yes, I'm in an emergency
                    </button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SOSConfirmationModal;