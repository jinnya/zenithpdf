
import React, { useMemo } from 'react';
import { PDF_TOOLS } from '../constants';
import { ToolCategory, PDFTool, Language } from '../types';
import ToolCard from '../components/ToolCard';
import { 
  Search, Sparkles, Shield, Zap, Cpu, Star, ExternalLink
} from 'lucide-react';

interface HomeProps {
  onSelectTool: (tool: PDFTool) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: ToolCategory | 'All';
  setActiveCategory: (cat: ToolCategory | 'All') => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ onSelectTool, searchQuery, setSearchQuery, activeCategory, setActiveCategory, language }) => {
  const isAR = language === 'AR';
  const categories: (ToolCategory | 'All')[] = ['All', ...Object.values(ToolCategory)];

  const t = {
    EN: {
      heroTitle: 'Master Your Documents with',
      heroSub: 'ZenithPDF',
      heroDesc: 'The world\'s most powerful, secure, and intuitive online PDF suite. 60+ professional tools powered by AI to supercharge your workflow.',
      searchPh: 'What do you want to do with your PDF today?',
      solutions: 'Professional PDF Solutions',
      solutionsSub: 'Fast, secure, and always accessible',
      trusted: 'TRUSTED BY MILLIONS OF PROFESSIONALS',
      feat1: 'Absolute Privacy',
      feat1Desc: 'We use TLS encryption and auto-delete files after processing.',
      feat2: 'AI Intelligence',
      feat2Desc: 'Automated translation and content analysis at your fingertips.',
      feat3: 'Zero Limits',
      feat3Desc: 'No installation required. High-speed processing for any file size.'
    },
    AR: {
      heroTitle: 'احترافية كاملة مع',
      heroSub: 'ZenithPDF',
      heroDesc: 'أقوى مجموعة أدوات PDF في العالم، آمنة وسهلة الاستخدام. أكثر من ٦٠ أداة احترافية مدعومة بالذكاء الاصطناعي.',
      searchPh: 'ماذا تريد أن تفعل بملف الـ PDF اليوم؟',
      solutions: 'حلول PDF احترافية',
      solutionsSub: 'سريعة، آمنة، ومتاحة دائماً',
      trusted: 'موثوق من قبل الملايين من المحترفين',
      feat1: 'خصوصية مطلقة',
      feat1Desc: 'نستخدم تشفير TLS ونحذف الملفات تلقائياً بعد المعالجة.',
      feat2: 'ذكاء اصطناعي',
      feat2Desc: 'ترجمة آلية وتحليل محتوى في متناول يدك.',
      feat3: 'بلا حدود',
      feat3Desc: 'لا يحتاج لتثبيت. معالجة سريعة لأي حجم ملف.'
    }
  }[language];

  const filteredTools = useMemo(() => {
    return PDF_TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className={`min-h-screen ${isAR ? 'text-right' : 'text-left'}`} dir={isAR ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 animate-fade-in">
            <Sparkles className="h-3 w-3" />
            Voted #1 PDF Suite of 2024
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
            {t.heroTitle} <span className="text-blue-600 block md:inline">{t.heroSub}</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
            {t.heroDesc}
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className={`absolute ${isAR ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors`} />
            <input 
              type="text" 
              placeholder={t.searchPh}
              className={`w-full ${isAR ? 'pr-16 pl-8 text-right' : 'pl-16 pr-8'} py-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-xl font-medium dark:text-white`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* AdSense Top Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full h-24 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Sponsored Content Placeholder
        </div>
      </div>

      {/* Categories Bar */}
      <section className="sticky top-20 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-y border-gray-100 dark:border-slate-800 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`hide-scrollbar flex gap-3 overflow-x-auto pb-1`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-gray-100 dark:border-slate-800 hover:border-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Display */}
      <section id="tools-grid" className="max-w-7xl mx-auto px-4 py-20">
        <div className={`flex items-center justify-between mb-16 ${isAR ? 'flex-row-reverse' : ''}`}>
           <div>
             <h2 className="text-4xl font-black text-slate-900 dark:text-white">{activeCategory === 'All' ? t.solutions : activeCategory}</h2>
             <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-[0.2em]">{t.solutionsSub}</p>
           </div>
           <div className="hidden sm:flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-2xl text-sm font-black ring-1 ring-blue-100 dark:ring-blue-900/30">
             <Star size={16} fill="currentColor" />
             60+ Tools Available
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onClick={onSelectTool} language={language} />
          ))}
        </div>
      </section>

      {/* AdSense Middle Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-full h-64 bg-gray-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Recommended for you - Ad Slot
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 dark:text-white">Why Professionals Choose ZenithPDF</h2>
            <p className="text-slate-500 font-medium">Enterprise power with individual simplicity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             <div className="flex flex-col items-center text-center gap-6 group">
               <div className="w-24 h-24 bg-white dark:bg-slate-900 text-blue-600 rounded-[2.5rem] shadow-xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500"><Shield size={40} /></div>
               <h3 className="text-2xl font-black dark:text-white">{t.feat1}</h3>
               <p className="text-slate-500 text-base leading-relaxed">{t.feat1Desc}</p>
             </div>
             <div className="flex flex-col items-center text-center gap-6 group">
               <div className="w-24 h-24 bg-white dark:bg-slate-900 text-indigo-600 rounded-[2.5rem] shadow-xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500"><Cpu size={40} /></div>
               <h3 className="text-2xl font-black dark:text-white">{t.feat2}</h3>
               <p className="text-slate-500 text-base leading-relaxed">{t.feat2Desc}</p>
             </div>
             <div className="flex flex-col items-center text-center gap-6 group">
               <div className="w-24 h-24 bg-white dark:bg-slate-900 text-orange-600 rounded-[2.5rem] shadow-xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500"><Zap size={40} /></div>
               <h3 className="text-2xl font-black dark:text-white">{t.feat3}</h3>
               <p className="text-slate-500 text-base leading-relaxed">{t.feat3Desc}</p>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
