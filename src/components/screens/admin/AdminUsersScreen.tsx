import React from 'react';
import { User, Wrench, UserCircle } from 'lucide-react';
import AnimatedPage from '../../shared/AnimatedPage';
import { useAppContext } from '../../../context/AppContext';
import { User as UserType, Role } from '../../../types';

const roleIcons = {
    [Role.ADMIN]: <UserCircle size={20} className="text-red-500" />,
    [Role.PROVIDER]: <Wrench size={20} className="text-blue-500" />,
    [Role.USER]: <User size={20} className="text-green-500" />,
};

const UserRow: React.FC<{ user: UserType }> = ({ user }) => (
    <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm flex items-center justify-between">
        <div className="flex items-center">
             <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                {roleIcons[user.role]}
            </div>
            <div>
                <p className="font-bold text-secondary-dark dark:text-dark-text">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{user.phone}</p>
            </div>
        </div>
        <div className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs font-semibold capitalize text-secondary-dark dark:text-dark-text">
            {user.role.toLowerCase()}
        </div>
    </div>
);

const AdminUsersScreen: React.FC = () => {
  const { allUsers } = useAppContext();

  return (
    <AnimatedPage className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary-dark dark:text-dark-text">Manage Users</h1>
      </div>

      <div className="space-y-3">
        {allUsers.length > 0 ? (
          allUsers.map(user => <UserRow key={user.id} user={user} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-dark-text-secondary p-8">No users found.</p>
        )}
      </div>
    </AnimatedPage>
  );
};

export default AdminUsersScreen;