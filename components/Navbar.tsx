
import React from 'react';
import { Search, Menu, UserCircle, Globe, Moon, Sun } from 'lucide-react';
import { ToolCategory, Language } from '../types';
import Logo from './Logo';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: ToolCategory | 'All') => void;
  isHome: boolean;
  language: Language;
  toggleLanguage: () => void;
  onOpenAuth: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  setActiveCategory, 
  isHome, 
  language, 
  toggleLanguage,
  onOpenAuth,
  darkMode,
  toggleDarkMode,
}) => {
  const scrollToSection = (id: string) => {
    if (!isHome) {
       window.location.hash = '#';
       setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
       return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const t = {
    EN: {
      solutions: 'Tools',
      pricing: 'Pricing',
      login: 'Login',
      signup: 'Sign Up',
      search: 'Search tools...',
      lang: 'English'
    },
    AR: {
      solutions: 'الأدوات',
      pricing: 'الأسعار',
      login: 'دخول',
      signup: 'اشترك',
      search: 'ابحث عن أداة...',
      lang: 'العربية'
    }
  }[language];

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-gray-100 dark:border-slate-800" dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="cursor-pointer" onClick={() => {
            window.location.hash = '#';
            setActiveCategory('All');
            setSearchQuery('');
          }}>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('tools-grid')} className="text-xs font-black text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors uppercase tracking-widest">{t.solutions}</button>
            <button onClick={() => scrollToSection('pricing')} className="text-xs font-black text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors uppercase tracking-widest">{t.pricing}</button>
            
            <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-700"></div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-tighter"
            >
              <Globe size={14} />
              {t.lang}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className={`absolute ${language === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400`} />
              <input 
                type="text" 
                placeholder={t.search} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${language === 'AR' ? 'pr-11 pl-5 text-right' : 'pl-11 pr-5'} py-3 bg-gray-100/50 dark:bg-slate-800/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 w-40 lg:w-56 transition-all font-medium placeholder:text-slate-400 outline-none dark:text-white`}
              />
            </div>
            <button onClick={onOpenAuth} className="hidden sm:flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
              <UserCircle className="h-5 w-5" />
              {t.login}
            </button>
            <button onClick={onOpenAuth} className="bg-blue-600 text-white px-7 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none active:scale-95">
              {t.signup}
            </button>
            <Menu className="lg:hidden h-6 w-6 text-slate-600 dark:text-slate-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
