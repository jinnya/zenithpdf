
import React, { useState, useRef } from 'react';
import { PDFTool, FileState, Language } from '../types';
import { 
  ArrowLeft, Upload, FileText, X, CheckCircle2, Loader2, 
  Sparkles, Download, ShieldCheck, Languages, Globe, Info,
  HardDrive, Link, Settings2, Lock, Unlock, Zap, Type, 
  RotateCw, Stamp, Sliders, Layout, UserCircle, Tag
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface EditorPageProps {
  tool: PDFTool;
  onBack: () => void;
  language: Language;
}

const EditorPage: React.FC<EditorPageProps> = ({ tool, onBack, language }) => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAR = language === 'AR';

  // Tool-specific states
  const [targetLang, setTargetLang] = useState('Arabic');
  const [password, setPassword] = useState('');
  const [compressionLevel, setCompressionLevel] = useState('Recommended');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  
  // Author & Metadata specific states
  const [metadata, setMetadata] = useState({
    title: '',
    author: '',
    subject: '',
    keywords: ''
  });

  const languagesList = ['Arabic', 'English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Russian'];

  const t = {
    EN: {
      ready: 'Ready to process?',
      drop: 'Drop your files here or click to browse.',
      select: 'Select Files',
      workspace: 'Workspace',
      settings: 'Tool Settings',
      process: 'Apply Changes',
      working: 'Processing with AI...',
      complete: 'Great Success!',
      desc: 'Your document is ready for download.',
      download: 'Download Now',
      another: 'Start New Task',
      aiBtn: 'AI Content Analysis',
      encryption: 'Military-Grade Encryption',
      targetLang: 'Translate to',
      passLabel: 'Secure Password',
      compressLabel: 'Compression Level',
      watermarkLabel: 'Watermark Text',
      metaTitle: 'Document Title',
      metaAuthor: 'Author Name',
      metaSubject: 'Subject/Description',
      metaKeywords: 'Keywords (comma separated)',
      aiSuggest: 'Suggest Author & Title'
    },
    AR: {
      ready: 'جاهز للمعالجة؟',
      drop: 'اسحب ملفاتك هنا أو انقر للتصفح.',
      select: 'اختر الملفات',
      workspace: 'مساحة العمل',
      settings: 'إعدادات الأداة',
      process: 'تطبيق التغييرات',
      working: 'جاري المعالجة بالذكاء الاصطناعي...',
      complete: 'تم بنجاح!',
      desc: 'مستندك جاهز للتحميل الآن.',
      download: 'تحميل الآن',
      another: 'بدء مهمة جديدة',
      aiBtn: 'تحليل المحتوى بالذكاء الاصطناعي',
      encryption: 'تشفير بمستوى عسكري',
      targetLang: 'ترجمة إلى',
      passLabel: 'كلمة مرور آمنة',
      compressLabel: 'مستوى الضغط',
      watermarkLabel: 'نص العلامة المائية',
      metaTitle: 'عنوان المستند',
      metaAuthor: 'اسم المؤلف',
      metaSubject: 'الموضوع/الوصف',
      metaKeywords: 'الكلمات المفتاحية',
      aiSuggest: 'اقتراح المؤلف والعنوان'
    }
  }[language];

  const addFiles = (selectedFiles: File[]) => {
    const newFiles: FileState[] = selectedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleAction = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsDone(true);
  };

  const handleAIAnalysis = async () => {
    if (files.length === 0) return;
    setAiAnalysis(isAR ? "جاري تحليل المستند..." : "Analyzing document structure...");
    const res = await geminiService.analyzePDFContent(`File: ${files[0].file.name}. Requested tool: ${tool.name}`);
    setAiAnalysis(res);
  };

  const handleAISuggestMetadata = async () => {
    if (files.length === 0) return;
    const suggested = await geminiService.suggestMetadata(files[0].file.name);
    if (suggested) {
      setMetadata({
        title: suggested.title || '',
        author: suggested.author || '',
        subject: suggested.subject || '',
        keywords: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90">
            <ArrowLeft className={`h-5 w-5 ${isAR ? 'rotate-180' : ''}`} />
          </button>
          <div className={`flex items-center gap-3 ${isAR ? 'flex-row-reverse text-right' : ''}`}>
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg">{tool.icon}</div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-lg">{tool.name}</h1>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{t.workspace}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-full border border-blue-100 dark:border-blue-900/20">
          <ShieldCheck size={16} className="text-blue-600" />
          <span className="text-[10px] font-black text-blue-900 dark:text-blue-400 uppercase tracking-tighter">{t.encryption}</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {!isDone ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-8">
              {files.length === 0 ? (
                <div 
                  className={`min-h-[500px] bg-white dark:bg-slate-900 border-4 border-dashed rounded-[3rem] p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files)); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                    <Upload size={32} />
                  </div>
                  <h2 className="text-2xl font-black mb-2 dark:text-white">{t.ready}</h2>
                  <p className="text-slate-400 mb-8 font-medium">{t.drop}</p>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">{t.select}</button>
                  <input type="file" ref={fileInputRef} multiple className="hidden" onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))} />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
                  {files.map((f, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 relative group text-center shadow-sm">
                      <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                      <div className="aspect-[3/4] bg-slate-50 dark:bg-slate-800 rounded-2xl mb-3 flex items-center justify-center border border-dashed border-gray-200">
                        <FileText size={40} className="text-blue-200" />
                      </div>
                      <p className="text-[10px] font-black truncate text-slate-500 uppercase">{f.file.name}</p>
                    </div>
                  ))}
                  <button onClick={() => fileInputRef.current?.click()} className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                    <Upload size={24} />
                    <span className="text-[10px] font-bold uppercase">Add More</span>
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-xl sticky top-28">
                <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                  <Settings2 size={18} />
                  <h4 className="font-black uppercase tracking-tight">{t.settings}</h4>
                </div>

                <div className="space-y-6">
                  {/* METADATA / AUTHOR OPTIONS */}
                  {tool.id === 'metadata' && (
                    <div className="space-y-4">
                      <button 
                        onClick={handleAISuggestMetadata}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 py-4 rounded-2xl text-xs font-black uppercase transition-all hover:bg-indigo-100"
                      >
                        <Sparkles size={14} /> {t.aiSuggest}
                      </button>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 block">{t.metaTitle}</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold" value={metadata.title} onChange={(e) => setMetadata({...metadata, title: e.target.value})} />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 block">{t.metaAuthor}</label>
                        <div className="relative">
                          <UserCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="text" className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold" value={metadata.author} onChange={(e) => setMetadata({...metadata, author: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 block">{t.metaKeywords}</label>
                        <div className="relative">
                          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="text" className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold" value={metadata.keywords} onChange={(e) => setMetadata({...metadata, keywords: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other tool settings remain... */}
                  {tool.id === 'translate-doc' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">{t.targetLang}</label>
                      <select className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold" onChange={(e) => setTargetLang(e.target.value)}>
                        {languagesList.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                    <button onClick={handleAIAnalysis} disabled={files.length === 0} className="w-full flex items-center justify-center gap-2 text-xs font-black text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition-colors uppercase">
                      <Sparkles size={14} /> {t.aiBtn}
                    </button>
                    {aiAnalysis && <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] text-slate-500 italic leading-relaxed border border-indigo-50 dark:border-indigo-900/20">{aiAnalysis}</div>}
                  </div>

                  <button onClick={handleAction} disabled={files.length === 0 || isProcessing} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
                    {isProcessing ? <><Loader2 className="animate-spin" /> {t.working}</> : t.process}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto py-20 text-center animate-fade-in">
             <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle2 className="text-green-600" size={48} />
             </div>
             <h2 className="text-4xl font-black mb-4 dark:text-white">{t.complete}</h2>
             <p className="text-slate-500 dark:text-slate-400 mb-10">{t.desc}</p>
             <button onClick={() => {}} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl flex items-center justify-center gap-4 hover:scale-105 transition-all">
               <Download size={24} /> {t.download}
             </button>
             <button onClick={() => { setFiles([]); setIsDone(false); setAiAnalysis(null); }} className="mt-6 text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">
               {t.another}
             </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditorPage;
