import React from 'react';
import { X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-secondary-dark dark:text-dark-text">Notifications</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-light dark:hover:bg-dark-bg">
                <X size={20} className="text-gray-500 dark:text-dark-text-secondary" />
              </button>
            </div>
            <div className="p-6 text-center text-gray-500 dark:text-dark-text-secondary flex flex-col items-center justify-center h-48">
              <Bell size={40} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="font-semibold text-secondary-dark dark:text-dark-text">No new notifications</h3>
              <p className="text-sm">We'll let you know when something new comes up.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;