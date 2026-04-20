import React, { useEffect, useRef } from 'react';
import { Wallet, LogOut, Bell, User } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  return (
    <nav 
      ref={navRef}
      className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-6 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          ref={logoRef}
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-2.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform duration-500">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
            {t('navbar.title')}<span className="text-gray-900">{t('navbar.tracker')}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <LanguageSwitcher />
          <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
          <button className="p-2.5 text-gray-400 hover:text-[#6366f1] hover:bg-[#6366f1]/5 rounded-2xl transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-black text-gray-900 leading-none">Harsh Thakur</p>
              <p className="text-[10px] font-bold text-[#6366f1] mt-1 uppercase tracking-wider">{t('navbar.premium')}</p>
            </div>
            <div 
              className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold border-2 border-white cursor-pointer hover:scale-110 transition-transform"
              style={{ boxShadow: '0 20px 50px -12px rgba(99, 102, 241, 0.15)' }}
            >
              H
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
