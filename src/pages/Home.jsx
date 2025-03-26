import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, CreditCard, Users, Calendar, PieChart, Settings } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('billing');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <PieChart size={20} /> },
    { id: 'guests', label: 'Guests', icon: <Users size={20} /> },
    { id: 'rooms', label: 'Rooms', icon: <Hotel size={20} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  // Sample data for quick stats
  const quickStats = [
    { label: 'Active Guests', value: '24', change: '+3', changeType: 'positive' },
    { label: 'Rooms Occupied', value: '18', change: '+2', changeType: 'positive' },
    { label: 'Pending Invoices', value: '7', change: '-2', changeType: 'negative' },
    { label: 'Today\'s Revenue', value: '$3,240', change: '+12%', changeType: 'positive' }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="neu-card mb-6">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="neu-card">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-surface-600 dark:text-surface-400">{stat.label}</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{stat.value}</span>
                    <span className={`text-xs ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Hotel Billing Management</h1>
            <p className="text-surface-600 dark:text-surface-400">
              Efficiently manage guest invoices, room charges, and payments
            </p>
          </div>

          {/* Main feature component */}
          <MainFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;