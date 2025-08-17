import React, { useState } from 'react';
import { ArrowLeft, User as UserIcon, Phone, KeyRound, Wrench, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Role } from '../../types';
import AnimatedPage from '../shared/AnimatedPage';

const RoleSelector: React.FC<{ selectedRole: Role; onSelectRole: (role: Role) => void; }> = ({ selectedRole, onSelectRole }) => (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onSelectRole(Role.USER)}
        className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${
          selectedRole === Role.USER
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-card'
        }`}
      >
        <Users size={24} className={selectedRole === Role.USER ? 'text-primary' : 'text-gray-500'} />
        <span className="font-semibold mt-2 text-secondary-dark dark:text-dark-text">I'm a Customer</span>
      </button>
      <button
        type="button"
        onClick={() => onSelectRole(Role.PROVIDER)}
        className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${
          selectedRole === Role.PROVIDER
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-card'
        }`}
      >
        <Wrench size={24} className={selectedRole === Role.PROVIDER ? 'text-primary' : 'text-gray-500'} />
        <span className="font-semibold mt-2 text-secondary-dark dark:text-dark-text">I'm a Service Provider</span>
      </button>
    </div>
);


const SignUpScreen: React.FC = () => {
  const { navigateBack, login } = useAppContext();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<Role>(Role.USER);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2) {
        setError('Please enter a valid name.');
        return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setStep('otp');
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') { // Mock OTP verification
      setError('');
      login(phone, role); // Use the login function to create/log in the new user with their chosen role
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
        <h1 className="text-3xl font-bold text-secondary-dark dark:text-dark-text">Create Account</h1>
        <p className="text-gray-500 dark:text-dark-text-secondary mt-1">Join GatiYaan and never worry about range again.</p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 'details' ? (
          <motion.form
            key="details-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleDetailsSubmit} className="space-y-6">
            <div className="space-y-2">
                 <label className="font-medium text-secondary dark:text-dark-text-secondary">Choose your role</label>
                <RoleSelector selectedRole={role} onSelectRole={setRole} />
            </div>
            <div>
              <label htmlFor="name" className="font-medium text-secondary dark:text-dark-text-secondary">Full Name</label>
              <div className="relative mt-2">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rohan Sharma" className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-secondary-dark dark:text-dark-text" required />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="font-medium text-secondary dark:text-dark-text-secondary">Phone Number</label>
              <div className="relative mt-2">
                <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-secondary-dark dark:text-dark-text" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-primary/30 transition-colors duration-300">
              Continue
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
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Sent to +91 {phone}. (Hint: 123456)</p>
              <div className="relative mt-2">
                 <KeyRound size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="_ _ _ _ _ _" className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary tracking-[0.5em] text-center bg-white dark:bg-dark-card text-secondary-dark dark:text-dark-text" required />
              </div>
            </div>
             <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-lg shadow-lg shadow-primary/30 transition-colors duration-300">
              Verify & Create Account
            </button>
          </motion.form>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      <div className="flex-shrink-0" />
    </AnimatedPage>
  );
};

export default SignUpScreen;