import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Account', path: '/account-details', icon: 'account_balance' },
    { name: 'Transfer', path: '/transfer-step1', icon: 'swap_horiz' },
    { name: 'Statement', path: '/statements', icon: 'description' },
    { name: 'Loan', path: '/loans', icon: 'account_balance' },
    { name: 'Request Limit', path: '/limit', icon: 'trending_up' }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2" 
            onClick={() => navigate('/dashboard')}
          >
            <span className="material-icons text-[#0046FF]">
              security
            </span>
            <span className="text-[#0046FF] font-bold text-xl">Digital Secure</span>
          </div>

          {/* Right side - Navigation Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-[#0046FF] px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
              >
                <span className="material-icons text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
            
            {/* Notification Icon */}
            <button
              onClick={() => navigate('/notifications')}
              className="text-gray-700 hover:text-[#0046FF] p-2 rounded-full hover:bg-gray-100"
              title="Notifications"
            >
              <span className="material-icons">notifications</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}