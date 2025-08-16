import React from 'react';
import { Users, Wrench, CheckCircle } from 'lucide-react';
import AnimatedPage from '../../shared/AnimatedPage';
import { useAppContext } from '../../../context/AppContext';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm flex items-center">
        <div className="p-3 bg-primary/20 rounded-lg mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-secondary-dark dark:text-dark-text">{value}</p>
        </div>
    </div>
);


const AdminDashboardScreen: React.FC = () => {
  const { allUsers, allProviders, bookingHistory } = useAppContext();

  const totalCompletedBookings = bookingHistory.filter(b => b.status === 'completed').length;

  return (
    <AnimatedPage className="p-4">
      <h1 className="text-2xl font-bold text-secondary-dark dark:text-dark-text mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Total Users" value={allUsers.length} icon={<Users size={24} className="text-primary"/>} />
        <StatCard title="Total Providers" value={allProviders.length} icon={<Wrench size={24} className="text-primary"/>} />
        <StatCard title="Completed Bookings" value={totalCompletedBookings} icon={<CheckCircle size={24} className="text-primary"/>} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-secondary-dark dark:text-dark-text mb-4">Quick Actions</h2>
        <div className="space-y-3">
            <button className="w-full text-left p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm">Manage Providers</button>
            <button className="w-full text-left p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm">View All Bookings</button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AdminDashboardScreen;