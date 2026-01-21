
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';
import Developer from './pages/Developer';
import AIAssistant from './components/AIAssistant';
import AuthModal from './components/AuthModal';
import { PDFTool, ToolCategory, Language } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'editor' | 'about' | 'privacy' | 'help' | 'developer'>('home');
  const [selectedTool, setSelectedTool] = useState<PDFTool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  const [language, setLanguage] = useState<Language>('EN');
  const [showAuth, setShowAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '' || hash === '#') {
        setCurrentPage('home');
        setSelectedTool(null);
      } else if (hash.includes('tool/')) {
        setCurrentPage('editor');
      } else if (hash === '#about') {
        setCurrentPage('about');
        setSelectedTool(null);
      } else if (hash === '#privacy') {
        setCurrentPage('privacy');
        setSelectedTool(null);
      } else if (hash === '#help') {
        setCurrentPage('help');
        setSelectedTool(null);
      } else if (hash === '#developer') {
        setCurrentPage('developer');
        setSelectedTool(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToolSelect = (tool: PDFTool) => {
    setSelectedTool(tool);
    window.location.hash = `tool/${tool.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedTool(null);
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'AR' : 'EN');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About language={language} onBack={handleBack} />;
      case 'privacy':
        return <PrivacyPolicy language={language} onBack={handleBack} />;
      case 'help':
        return <Help language={language} onBack={handleBack} />;
      case 'developer':
        return <Developer language={language} onBack={handleBack} />;
      case 'editor':
        return selectedTool ? <EditorPage tool={selectedTool} onBack={handleBack} language={language} /> : <Home onSelectTool={handleToolSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} language={language} />;
      default:
        return (
          <Home 
            onSelectTool={handleToolSelect} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            language={language}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${language === 'AR' ? 'rtl' : 'ltr'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setActiveCategory={setActiveCategory}
        isHome={currentPage === 'home'}
        language={language}
        toggleLanguage={toggleLanguage}
        onOpenAuth={() => setShowAuth(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex-grow">
        {renderPage()}
      </div>
      
      <Footer />
      
      <AIAssistant />
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        language={language}
      />
    </div>
  );
};

export default App;
