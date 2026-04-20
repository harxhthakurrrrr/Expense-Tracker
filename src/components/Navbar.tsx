import React, { useEffect, useRef } from 'react';
import { Wallet, LogOut, Bell, User } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      // Logo floating animation
      gsap.to(iconRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
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
    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to(iconRef.current, {
      rotate: 0,
      duration: 0.5,
    });
  };

  return (
    <nav 
      ref={navRef}
      className="bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          ref={logoRef}
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-colors"></div>
            <div className="relative p-2.5 bg-cyber-gray rounded-xl border border-primary/30 shadow-neon">
              <Wallet ref={iconRef} className="text-primary w-6 h-6 relative z-10" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">
            <span className="text-primary">{t('navbar.title')}</span>
            <span className="text-white ml-1">{t('navbar.tracker')}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-8">
          <LanguageSwitcher />
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <button className="p-2 text-gray-500 hover:text-primary transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(255,0,60,0.8)]"></span>
          </button>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-black text-white leading-none uppercase tracking-widest">Harsh Thakur</p>
              <p className="text-[9px] font-bold text-primary mt-1 uppercase tracking-[0.2em]">{t('navbar.premium')}</p>
            </div>
            <div 
              className="h-10 w-10 rounded-xl bg-cyber-gray border border-primary/30 flex items-center justify-center text-primary font-black cursor-pointer hover:border-primary transition-all shadow-neon"
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
