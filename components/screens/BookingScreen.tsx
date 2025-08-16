import React, { useState, useEffect } from 'react';
import { Phone, Shield, X, Heart } from 'lucide-react';
import { Booking } from '../../types';
import { useAppContext } from '../../context/AppContext';
import AnimatedPage from '../shared/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';
import SOSConfirmationModal from '../shared/SOSConfirmationModal';

// IMPORTANT: In a real app, this should be in a .env file
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || ""; // Add your key for this to work

interface BookingScreenProps {
  booking: Booking;
}

const BookingFooter: React.FC<{ booking: Booking }> = ({ booking }) => {
    const { cancelBooking } = useAppContext();
    const [isSosModalOpen, setIsSosModalOpen] = useState(false);
    const van = booking.van;

    return (
        <>
            <SOSConfirmationModal isOpen={isSosModalOpen} onClose={() => setIsSosModalOpen(false)} />
            <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                className="bg-white dark:bg-dark-card rounded-t-3xl p-6 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10"
            >
              <h3 className="text-center font-bold text-secondary-dark dark:text-dark-text text-xl mb-2">Your GatiYaan Partner is on the way!</h3>
              <p className="text-center text-gray-500 dark:text-dark-text-secondary text-sm mb-4">Stay safe, help is arriving soon.</p>
              
              <div className="bg-light dark:bg-dark-bg p-4 rounded-xl flex justify-between items-center">
                  <div>
                      <p className="font-bold text-secondary-dark dark:text-dark-text">{van.partnerName}</p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{van.vanModel} - <span className="font-semibold text-primary">Verified</span></p>
                  </div>
                  <div className="flex items-center space-x-3">
                      <a href="tel:1234567890" className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                          <Phone size={20}/>
                      </a>
                      <button onClick={() => setIsSosModalOpen(true)} className="w-10 h-10 bg-red-500/20 text-red-600 rounded-full flex items-center justify-center">
                          <Shield size={20}/>
                      </button>
                  </div>
              </div>

              <button 
                onClick={cancelBooking}
                className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-dark-text font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <X size={16} />
                <span>Cancel Booking</span>
              </button>
            </motion.div>
        </>
    );
};

const MapView: React.FC<{booking: Booking}> = ({booking}) => {
    // Mock user location
    const userLocation = { lat: 12.9357, lng: 77.6245 }; 
    const vanLocation = { lat: booking.van.lat, lng: booking.van.lng };
    
    // Fallback if API key is missing
    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-center p-4">
                <p className="text-gray-600">Google Maps API Key not configured. Map view is disabled.</p>
            </div>
        );
    }
    
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x600&maptype=roadmap&markers=color:blue%7Clabel:U%7C${userLocation.lat},${userLocation.lng}&markers=color:orange%7Clabel:V%7C${vanLocation.lat},${vanLocation.lng}&path=color:0xffa500%7Cweight:5%7C${vanLocation.lat},${vanLocation.lng}%7C${userLocation.lat},${userLocation.lng}&key=${GOOGLE_MAPS_API_KEY}`;
    
    return <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${mapUrl})`, filter: 'grayscale(30%) brightness(0.9)' }} />;
}


const BookingScreen: React.FC<BookingScreenProps> = ({ booking }) => {
  const { completeBooking } = useAppContext();
  const [etaSeconds, setEtaSeconds] = useState(booking.van.etaMinutes * 60);
  
  const totalDuration = booking.van.etaMinutes * 60;

  useEffect(() => {
    if (etaSeconds > 0) {
      const timer = setTimeout(() => setEtaSeconds(etaSeconds - 1), 1000); 
      return () => clearTimeout(timer);
    } else {
        setTimeout(completeBooking, 3000); // Wait 3s then complete
    }
  }, [etaSeconds, completeBooking]);

  const minutesLeft = Math.floor(etaSeconds / 60);
  const secondsLeft = etaSeconds % 60;
  const progress = (totalDuration - etaSeconds) / totalDuration;
  
  return (
      <AnimatedPage className="flex flex-col h-full bg-light dark:bg-dark-bg overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative">
            <MapView booking={booking} />
            
            {/* Animated Van on Path */}
            {/* The path is simplified to a straight diagonal line across the screen for visual effect */}
            <motion.div
              className="absolute"
              style={{
                  top: '20%',
                  left: '10%'
              }}
              animate={{
                top: `${20 + progress * 50}%`,
                left: `${10 + progress * 70}%`
              }}
              transition={{ duration: 1, ease: 'linear'}}
            >
               <motion.img 
                src="https://i.imgur.com/z40N9tA.png" 
                alt="EV Van" 
                className="w-12 h-12 -scale-x-100"
                animate={{ rotate: [0, 5, -5, 0]}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               />
            </motion.div>

            {/* Timer Display */}
            <div className="absolute top-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                 <AnimatePresence mode="wait">
                    {etaSeconds > 0 ? (
                        <motion.div
                            key="timer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <p className="text-secondary dark:text-dark-text-secondary text-sm">Arriving in</p>
                            <p className="font-bold text-4xl text-secondary-dark dark:text-dark-text">
                                {String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}
                            </p>
                        </motion.div>
                    ) : (
                         <motion.div
                            key="arrived"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <p className="font-bold text-2xl text-secondary-dark dark:text-dark-text">Partner has arrived!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
        </div>
        
        <BookingFooter booking={booking} />
      </AnimatedPage>
  );
};

export default BookingScreen;