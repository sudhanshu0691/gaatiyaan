import React, { useState } from 'react';
import { ArrowLeft, Phone, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Role } from '../../types';
import AnimatedPage from '../shared/AnimatedPage';

const SignInScreen: React.FC = () => {
  const { navigateBack, login } = useAppContext();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10 || phone === "0000000000") {
      setError('');
      setStep('otp');
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Login Check
    if (phone === '0000000000' && otp === 'admin123') {
        login(phone);
        return;
    }

    if (otp === '123456') { // Mock OTP for everyone else
      setError('');
      // In a real app, the role would be fetched from the backend.
      // Here, we mock it based on the number for demonstration.
      const userRole = phone === '8765432109' ? Role.PROVIDER : Role.USER;
      const loggedInUser = login(phone, userRole);
      
      if (!loggedInUser) {
          setError('Failed to log in. User not found.');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <AnimatedPage className="p-6 flex flex-col h-full bg-white dark:bg-dark-bg">
      <div className="flex-shrink-0">
        <button onClick={navigateBack} className="flex items-center text-secondary dark:text-dark-text-secondary mb-8 p-2 rounded-full hover:bg-light dark:hover:bg-dark-card">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-secondary-dark dark:text-dark-text">Welcome Back!</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary mt-1">Sign in to find your charge.</p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 'phone' ? (
          <motion.form 
            key="phone-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="font-medium text-secondary dark:text-dark-text-secondary">Phone Number</label>
              <div className="relative mt-2">
                <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-secondary-dark dark:text-dark-text"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-primary/30 transition-colors duration-300">
              Get OTP
            </button>
          </motion.form>
        ) : (
          <motion.form 
            key="otp-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="font-medium text-secondary dark:text-dark-text-secondary">Enter OTP</label>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Sent to +91 {phone}.</p>
              <div className="relative mt-2">
                 <KeyRound size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="_ _ _ _ _ _"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary tracking-[0.5em] text-center bg-white dark:bg-dark-card text-secondary-dark dark:text-dark-text"
                  required
                />
              </div>
            </div>
             <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-primary/30 transition-colors duration-300">
              Verify & Sign In
            </button>
          </motion.form>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      <div className="flex-shrink-0" />
    </AnimatedPage>
  );
};

export default SignInScreen;