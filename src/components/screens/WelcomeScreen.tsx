import React from 'react';
import { Zap, LogIn, UserPlus } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Screen } from '../../types';
import AnimatedPage from '../shared/AnimatedPage';

const WelcomeScreen: React.FC = () => {
  const { navigateTo } = useAppContext();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };


  return (
    <AnimatedPage className="bg-gradient-to-br from-primary to-primary-dark h-full flex flex-col justify-between p-8 text-white">
      <div />
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          className="mb-4 inline-block p-4 bg-white/20 rounded-full"
        >
          <Zap size={60} className="text-white" />
        </motion.div>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold tracking-tighter"
        >
          GatiYaan
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-lg opacity-90"
        >
          EV Charging, On The Go.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo(Screen.SignIn)}
          className="w-full bg-white text-primary-dark font-bold py-4 rounded-xl text-lg flex items-center justify-center space-x-2 shadow-lg"
        >
          <LogIn size={20} />
          <span>Sign In</span>
        </motion.button>
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo(Screen.SignUp)}
          className="w-full bg-white/30 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center space-x-2"
        >
          <UserPlus size={20} />
          <span>Create Account</span>
        </motion.button>
      </motion.div>
    </AnimatedPage>
  );
};

export default WelcomeScreen;