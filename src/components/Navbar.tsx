import React, { useEffect, useRef } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            ExpenseTracker
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-danger transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
