
import React from 'react';
import { ShieldCheck, Cpu, Globe, Users, Heart, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AboutProps {
  language: Language;
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ language, onBack }) => {
  const isAR = language === 'AR';

  const t = {
    EN: {
      hero: "Mission to Simplify Documents",
      heroSub: "ZenithPDF was born from a simple idea: professional document tools should be accessible, secure, and powered by the latest AI technology.",
      missionTitle: "Our Mission",
      missionDesc: "To provide the world's most comprehensive PDF suite that respects user privacy and enhances productivity through Gemini AI.",
      teamTitle: "The Authors & Visionaries",
      teamSub: "Meet the experts behind the code.",
      techTitle: "Powered by Zenith AI",
      techDesc: "We leverage Google's Gemini models to provide smart document analysis, translations, and metadata suggestions that were previously impossible.",
      cta: "Back to Tools"
    },
    AR: {
      hero: "مهمتنا هي تبسيط المستندات",
      heroSub: "ولدت ZenithPDF من فكرة بسيطة: يجب أن تكون أدوات المستندات الاحترافية سهلة الوصول وآمنة ومدعومة بأحدث تقنيات الذكاء الاصطناعي.",
      missionTitle: "مهمتنا",
      missionDesc: "توفير مجموعة أدوات PDF الأكثر شمولاً في العالم والتي تحترم خصوصية المستخدم وتعزز الإنتاجية من خلال Gemini AI.",
      teamTitle: "المؤلفون والمبتكرون",
      teamSub: "تعرف على الخبراء وراء الكود.",
      techTitle: "مدعوم بـ Zenith AI",
      techDesc: "نحن نستخدم نماذج Google Gemini لتوفير تحليل ذكي للمستندات وترجمات واقتراحات بيانات وصفية لم تكن ممكنة من قبل.",
      cta: "العودة للأدوات"
    }
  }[language];

  const stats = [
    { label: 'Active Users', value: '10M+', icon: <Users className="text-blue-500" /> },
    { label: 'Files Processed', value: '50M+', icon: <Zap className="text-orange-500" /> },
    { label: 'AI Operations', value: '1M+', icon: <Sparkles className="text-indigo-500" /> },
  ];

  const team = [
    { name: "Sarah Chen", role: "Lead Architect", bio: "Expert in document security and cloud infrastructure.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150" },
    { name: "Marcus Thorne", role: "AI Research", bio: "Former Google Engineer specializing in LLM integrations.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150" },
    { name: "Elena Rodriguez", role: "UX Director", bio: "Creating intuitive interfaces for complex workflows.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150" }
  ];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 ${isAR ? 'text-right' : 'text-left'}`} dir={isAR ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-12 hover:gap-4 transition-all">
             {isAR ? <ArrowRight className="rotate-180" size={16} /> : <ArrowRight className="rotate-180" size={16} />}
             {t.cta}
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            {t.hero}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-black dark:text-white">{stat.value}</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Tech */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="space-y-8">
             <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-3xl"><Heart size={32} /></div>
             <h2 className="text-4xl font-black dark:text-white">{t.missionTitle}</h2>
             <p className="text-lg text-slate-500 leading-relaxed font-medium">{t.missionDesc}</p>
             <ul className="space-y-4">
                {[
                  { title: "Privacy First", desc: "No file ever leaves your sight without encryption." },
                  { title: "Universal Access", desc: "Free for individuals, powerful for enterprises." },
                  { title: "Innovation", desc: "Weekly updates with new AI capabilities." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><ShieldCheck size={14} /></div>
                    <div>
                      <h4 className="font-bold dark:text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
             </ul>
           </div>

           <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="inline-block p-4 bg-white/10 rounded-3xl mb-8"><Cpu size={32} /></div>
                <h2 className="text-4xl font-black mb-6">{t.techTitle}</h2>
                <p className="text-slate-300 text-lg leading-relaxed font-medium mb-10">{t.techDesc}</p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="font-black text-2xl mb-1">99.9%</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="font-black text-2xl mb-1">&lt; 2s</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Latency</div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50 px-4">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black mb-4 dark:text-white">{t.teamTitle}</h2>
          <p className="text-slate-500 font-medium">{t.teamSub}</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 text-center hover:-translate-y-2 transition-transform duration-500">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-[2rem] mx-auto mb-6 object-cover ring-4 ring-blue-50 dark:ring-slate-800" />
              <h3 className="text-xl font-black dark:text-white mb-1">{member.name}</h3>
              <div className="text-blue-600 text-xs font-black uppercase tracking-widest mb-4">{member.role}</div>
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
