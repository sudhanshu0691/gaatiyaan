import React, { useState } from 'react';
import { ArrowLeft, User, Phone } from 'lucide-react';
import AnimatedPage from '../shared/AnimatedPage';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const AccountSettingsScreen: React.FC = () => {
  const { user, navigateBack } = useAppContext();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone.replace('+91 ', '') || '');

  const handleSave = () => {
    // In a real app, you would call an API to update the user details.
    // Here we'll just log it and navigate back.
    console.log("Saving user details:", { name, phone });
    alert("Details saved successfully! (mocked)");
    navigateBack();
  };

  return (
    <AnimatedPage className="p-4 flex flex-col h-full">
      <div className="flex-1 mt-4">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="font-medium text-secondary dark:text-dark-text-secondary">Full Name</label>
            <div className="relative mt-2">
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-secondary-dark dark:text-dark-text"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="font-medium text-secondary dark:text-dark-text-secondary">Phone Number</label>
            <div className="relative mt-2">
              <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-secondary-dark dark:text-dark-text"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-auto pt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/30 transition-colors duration-300"
        >
          Save Changes
        </motion.button>
      </div>
    </AnimatedPage>
  );
};

export default AccountSettingsScreen;