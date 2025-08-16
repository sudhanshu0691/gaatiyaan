import React, { useState } from 'react';
import { PlusCircle, Wrench } from 'lucide-react';
import AnimatedPage from '../../shared/AnimatedPage';
import { useAppContext } from '../../../context/AppContext';
import { Van } from '../../../types';
import ProviderForm from '../../shared/ProviderForm';

const ProviderRow: React.FC<{ provider: Van }> = ({ provider }) => (
    <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm flex items-center justify-between">
        <div className="flex items-center">
            <div className="p-3 bg-primary/20 rounded-lg mr-4">
                <Wrench size={20} className="text-primary" />
            </div>
            <div>
                <p className="font-bold text-secondary-dark dark:text-dark-text">{provider.partnerName}</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{provider.vanModel}</p>
            </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${provider.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {provider.status || 'approved'}
        </div>
    </div>
);

const AdminProvidersScreen: React.FC = () => {
  const { allProviders } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <AnimatedPage className="p-4">
      <ProviderForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary-dark dark:text-dark-text">Manage Providers</h1>
        <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
            <PlusCircle size={18} />
            <span>Add Provider</span>
        </button>
      </div>

      <div className="space-y-3">
        {allProviders.length > 0 ? (
          allProviders.map(provider => <ProviderRow key={provider.id} provider={provider} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-dark-text-secondary p-8">No providers found.</p>
        )}
      </div>
    </AnimatedPage>
  );
};

export default AdminProvidersScreen;