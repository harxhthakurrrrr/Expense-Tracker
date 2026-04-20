import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(dropdownRef.current, 
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 mono"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-[10px] font-black text-gray-400 hidden sm:block uppercase tracking-widest">{currentLanguage.name}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-cyber-dark rounded-xl shadow-neon border border-primary/20 overflow-hidden z-[60]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary/10 ${
                i18n.language === lang.code ? 'bg-primary/20 text-primary' : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-[10px] font-black uppercase tracking-widest mono">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
