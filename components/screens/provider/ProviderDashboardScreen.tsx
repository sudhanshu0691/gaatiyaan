import React from 'react';
import { Zap, User, Clock, Check, Power, PowerOff } from 'lucide-react';
import AnimatedPage from '../../shared/AnimatedPage';
import { useAppContext } from '../../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../../../types';

const JobRequestCard: React.FC<{ job: Job }> = ({ job }) => {
    const { acceptJob } = useAppContext();
    const booking = job.booking;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <User size={20} className="text-primary mr-3" />
                    <p className="font-bold text-secondary-dark dark:text-dark-text">{booking.user.name}</p>
                </div>
                <div className="flex items-center text-sm">
                    <Clock size={14} className="text-gray-500 mr-1" />
                    <span>{booking.van.etaMinutes} min away</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">New charging request near you.</p>
            <button
                onClick={() => acceptJob(job)}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2"
            >
                <Check size={18} />
                <span>Accept Job</span>
            </button>
        </motion.div>
    );
};

const ActiveJobCard: React.FC<{ job: Job }> = ({ job }) => {
    const { arriveAtJob, completeJobForProvider } = useAppContext();
    const booking = job.booking;

    return (
         <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-secondary-dark dark:text-dark-text">Active Job</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Destination: User's Location</p>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p><strong>Customer:</strong> {booking.user.name}</p>
                <p><strong>Status:</strong> <span className="font-semibold capitalize text-primary">{job.status}</span></p>
            </div>
            <div className="mt-4 flex space-x-2">
                {job.status === 'accepted' && (
                    <button onClick={arriveAtJob} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">Mark as Arrived</button>
                )}
                {job.status === 'arrived' && (
                     <button onClick={completeJobForProvider} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg">Complete Job</button>
                )}
            </div>
         </div>
    );
};


const ProviderDashboardScreen: React.FC = () => {
    const { user, isAvailable, toggleAvailability, incomingJobs, activeJob } = useAppContext();

    return (
        <AnimatedPage className="p-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-secondary-dark dark:text-dark-text">Dashboard</h1>
                    <p className="text-gray-500 dark:text-dark-text-secondary">Welcome, {user?.name.split(' ')[0]}</p>
                </div>
                <button
                    onClick={toggleAvailability}
                    className={`px-4 py-2 rounded-full font-bold flex items-center space-x-2 transition-colors ${
                        isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                    {isAvailable ? <Power size={16} /> : <PowerOff size={16} />}
                    <span>{isAvailable ? 'Online' : 'Offline'}</span>
                </button>
            </div>

            {activeJob ? (
                <ActiveJobCard job={activeJob} />
            ) : isAvailable ? (
                <div>
                    <h2 className="font-bold text-lg text-secondary-dark dark:text-dark-text mb-3">Incoming Jobs</h2>
                    <div className="space-y-4">
                        <AnimatePresence>
                            {incomingJobs.length > 0 ? (
                                incomingJobs.map(job => <JobRequestCard key={job.booking.id} job={job} />)
                            ) : (
                                <div className="text-center py-10 px-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                                    <Zap size={32} className="mx-auto text-gray-400" />
                                    <p className="mt-2 text-gray-500 dark:text-dark-text-secondary">Waiting for new requests...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 px-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                    <PowerOff size={32} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500 dark:text-dark-text-secondary">You are offline. Toggle the switch to start receiving jobs.</p>
                </div>
            )}
        </AnimatedPage>
    );
};

export default ProviderDashboardScreen;