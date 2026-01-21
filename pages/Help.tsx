
import React from 'react';
import { HelpCircle, Search, Book, MessageSquare, LifeBuoy, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface HelpProps {
  language: Language;
  onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ language, onBack }) => {
  const isAR = language === 'AR';
  const t = {
    EN: {
      title: "Help Center",
      subtitle: "Find answers, tutorials, and support from our expert team.",
      searchPh: "Search for help articles...",
      common: "Common Questions",
      back: "Back to Home"
    },
    AR: {
      title: "مركز المساعدة",
      subtitle: "اعثر على الإجابات والدروس والدعم من فريقنا الخبير.",
      searchPh: "ابحث عن مقالات المساعدة...",
      common: "الأسئلة الشائعة",
      back: "العودة للرئيسية"
    }
  }[language];

  const sections = [
    { icon: <Book />, title: isAR ? "دروس البداية" : "Getting Started", desc: isAR ? "تعلم كيفية استخدام أدوات PDF الأساسية." : "Learn how to use basic PDF tools." },
    { icon: <LifeBuoy />, title: isAR ? "حل المشكلات" : "Troubleshooting", desc: isAR ? "حلول للمشاكل التقنية الشائعة." : "Solutions to common technical issues." },
    { icon: <MessageSquare />, title: isAR ? "تواصل معنا" : "Contact Support", desc: isAR ? "تحدث مع فريق الدعم الفني." : "Speak with our technical support team." }
  ];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 ${isAR ? 'text-right' : 'text-left'}`} dir={isAR ? 'rtl' : 'ltr'}>
      <section className="py-24 px-4 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-white/80 font-black text-xs uppercase tracking-widest mb-10 hover:text-white transition-all">
            <ArrowLeft className={isAR ? 'rotate-180' : ''} size={16} /> {t.back}
          </button>
          <h1 className="text-5xl font-black mb-6 tracking-tight">{t.title}</h1>
          <p className="text-xl text-blue-100 mb-12 font-medium">{t.subtitle}</p>
          <div className="max-w-xl mx-auto relative">
            <Search className={`absolute ${isAR ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-slate-400`} />
            <input type="text" placeholder={t.searchPh} className={`w-full ${isAR ? 'pr-16 pl-6 text-right' : 'pl-16 pr-6'} py-5 bg-white rounded-2xl text-slate-900 shadow-2xl border-none outline-none font-medium`} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((s, i) => (
            <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">{s.icon}</div>
              <h3 className="text-xl font-black mb-2 dark:text-white">{s.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Help;
