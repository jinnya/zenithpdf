
import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft, Globe, UserCheck } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyProps {
  language: Language;
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ language, onBack }) => {
  const isAR = language === 'AR';

  const t = {
    EN: {
      title: "Privacy Policy",
      subtitle: "Your privacy is our highest priority. Learn how we protect your data.",
      lastUpdated: "Last Updated: October 2024",
      section1: "Data Collection",
      desc1: "We do not store your PDF files. All files are processed on our secure servers and automatically deleted within 60 minutes of processing.",
      section2: "Security Standards",
      desc2: "We use 256-bit SSL encryption for all file transfers. Your documents are only accessible to you during the processing session.",
      section3: "Cookies & Ads",
      desc3: "We use cookies to improve your experience and show relevant ads through Google AdSense. We do not sell your personal information to third parties.",
      back: "Back to Home"
    },
    AR: {
      title: "سياسة الخصوصية",
      subtitle: "خصوصيتك هي أولويتنا القصوى. تعرف على كيفية حماية بياناتك.",
      lastUpdated: "آخر تحديث: أكتوبر ٢٠٢٤",
      section1: "جمع البيانات",
      desc1: "نحن لا نقوم بتخزين ملفات PDF الخاصة بك. يتم معالجة جميع الملفات على خوادمنا الآمنة وحذفها تلقائياً خلال ٦٠ دقيقة.",
      section2: "معايير الأمان",
      desc2: "نستخدم تشفير SSL 256-bit لجميع عمليات نقل الملفات. مستنداتك متاحة لك فقط أثناء جلسة المعالجة.",
      section3: "الكوكيز والإعلانات",
      desc3: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وعرض إعلانات ذات صلة عبر Google AdSense. نحن لا نبيع معلوماتك الشخصية.",
      back: "العودة للرئيسية"
    }
  }[language];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 ${isAR ? 'text-right' : 'text-left'}`} dir={isAR ? 'rtl' : 'ltr'}>
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-10 hover:gap-4 transition-all">
            <ArrowLeft className={isAR ? 'rotate-180' : ''} size={16} /> {t.back}
          </button>
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-3xl mb-6">
            <Shield size={40} />
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 font-medium text-lg mb-2">{t.subtitle}</p>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.lastUpdated}</span>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="flex gap-8 items-start">
             <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-blue-500"><Lock size={32} /></div>
             <div>
               <h2 className="text-2xl font-black mb-4 dark:text-white">{t.section1}</h2>
               <p className="text-slate-500 leading-relaxed font-medium">{t.desc1}</p>
             </div>
          </div>
          
          <div className="flex gap-8 items-start">
             <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-indigo-500"><UserCheck size={32} /></div>
             <div>
               <h2 className="text-2xl font-black mb-4 dark:text-white">{t.section2}</h2>
               <p className="text-slate-500 leading-relaxed font-medium">{t.desc2}</p>
             </div>
          </div>

          <div className="flex gap-8 items-start">
             <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-orange-500"><Globe size={32} /></div>
             <div>
               <h2 className="text-2xl font-black mb-4 dark:text-white">{t.section3}</h2>
               <p className="text-slate-500 leading-relaxed font-medium">{t.desc3}</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
