import React, { useState } from 'react';
import { X, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Van } from '../../types';

interface ProviderFormProps {
    isOpen: boolean;
    onClose: () => void;
    provider?: Van;
}

const ProviderForm: React.FC<ProviderFormProps> = ({ isOpen, onClose, provider }) => {
  const { addProvider, updateProvider } = useAppContext();
  const [formData, setFormData] = useState({
      partnerName: provider?.partnerName || '',
      vanModel: provider?.vanModel || '',
      pricePerKWh: provider?.pricePerKWh || 0,
      capacityKWh: provider?.capacityKWh || 0,
      etaMinutes: provider?.etaMinutes || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: type === 'number' ? parseFloat(value) : value
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (provider) {
          updateProvider({ ...provider, ...formData });
      } else {
          addProvider(formData);
      }
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
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-secondary-dark dark:text-dark-text flex items-center">
                <Wrench size={20} className="mr-2 text-primary" />
                {provider ? 'Edit Provider' : 'Add New Provider'}
              </h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-light dark:hover:bg-dark-bg">
                <X size={20} className="text-gray-500 dark:text-dark-text-secondary" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {Object.keys(formData).map(key => (
                    <div key={key}>
                        <label htmlFor={key} className="font-medium text-sm text-secondary dark:text-dark-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            id={key}
                            name={key}
                            type={typeof (formData as any)[key] === 'number' ? 'number' : 'text'}
                            value={(formData as any)[key]}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-bg text-secondary-dark dark:text-dark-text"
                        />
                    </div>
                ))}

                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-primary/30 transition-colors duration-300">
                   {provider ? 'Save Changes' : 'Add Provider'}
                </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProviderForm;