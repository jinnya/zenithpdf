
import React from 'react';
import { Code, Terminal, Cpu, Zap, ArrowLeft, Globe, Database } from 'lucide-react';
import { Language } from '../types';

interface DeveloperProps {
  language: Language;
  onBack: () => void;
}

const Developer: React.FC<DeveloperProps> = ({ language, onBack }) => {
  const isAR = language === 'AR';
  const t = {
    EN: {
      title: "Developer API",
      subtitle: "Integrate professional PDF tools directly into your applications.",
      cta: "Get API Key",
      back: "Back to Home"
    },
    AR: {
      title: "واجهة برمجة التطبيقات",
      subtitle: "قم بدمج أدوات PDF الاحترافية مباشرة في تطبيقاتك.",
      cta: "احصل على المفتاح",
      back: "العودة للرئيسية"
    }
  }[language];

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isAR ? 'text-right' : 'text-left'}`} dir={isAR ? 'rtl' : 'ltr'}>
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15),transparent)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest mb-10 hover:text-white transition-all">
            <ArrowLeft className={isAR ? 'rotate-180' : ''} size={16} /> {t.back}
          </button>
          <div className="inline-block p-4 bg-blue-600/20 text-blue-500 rounded-3xl mb-8">
            <Terminal size={40} />
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tight">{t.title}</h1>
          <p className="text-xl text-slate-400 mb-12 font-medium">{t.subtitle}</p>
          <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 transition-all">
            {t.cta}
          </button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-500 text-xs font-mono ml-4">POST /api/v1/pdf/merge</span>
            </div>
            <pre className="text-blue-400 font-mono text-sm leading-relaxed overflow-x-auto">
{`{
  "files": [
    "https://zenithpdf.com/docs/report_a.pdf",
    "https://zenithpdf.com/docs/report_b.pdf"
  ],
  "options": {
    "optimization": "high",
    "metadata": {
      "author": "Zenith Developer"
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developer;
