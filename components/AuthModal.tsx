
import React, { useState } from 'react';
import { X, Mail, Lock, User, Github, Chrome, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // List of known disposable email domains to block
  const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com', 
    'yopmail.com', 'dispostable.com', 'sharklasers.com', 'maildrop.cc', 
    'getnada.com', 'moakt.com', 'boun.cr', 'jetable.org', 'tempmail.com',
    'trashmail.com', 'mail-temp.com', 'temp-mail.io', 'minutebox.com'
  ];

  // List of trusted/known providers to encourage
  const TRUSTED_PROVIDERS = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com', 'protonmail.com', 'zoho.com', 'me.com', 'msn.com'];

  const t = {
    EN: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      forgot: 'Forgot password?',
      or: 'or continue with',
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      welcome: "Welcome Back",
      create: "Create Account",
      successMsg: "Authenticated Successfully!",
      errorTemp: "Temporary emails are not allowed. Please use a known provider (Gmail, Outlook, etc.).",
      errorInvalid: "Please enter a valid professional email address."
    },
    AR: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      forgot: 'نسيت كلمة المرور؟',
      or: 'أو الاستمرار بواسطة',
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب بالفعل؟",
      welcome: "مرحباً بعودتك",
      create: "إنشاء حساب جديد",
      successMsg: "تم تسجيل الدخول بنجاح!",
      errorTemp: "غير مسموح باستخدام البريد المؤقت. يرجى استخدام بريد معروف (Gmail، Outlook، إلخ).",
      errorInvalid: "يرجى إدخال بريد إلكتروني صالح واحترافي."
    }
  }[language];

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    
    // Check if it's in the disposable list
    if (DISPOSABLE_DOMAINS.includes(domain)) return 'temp';
    
    // Optional: Strictly check if it's NOT in trusted list (uncomment if you want extremely strict)
    // if (!TRUSTED_PROVIDERS.includes(domain)) return 'untrusted';
    
    return 'valid';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateEmail(email);
    
    if (validation === 'temp') {
      setError(t.errorTemp);
      return;
    }

    if (email.length < 5 || !email.includes('.')) {
      setError(t.errorInvalid);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className={`bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative ${language === 'AR' ? 'text-right' : 'text-left'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
        <button onClick={() => { onClose(); setError(null); }} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400">
          <X size={20} />
        </button>

        <div className="p-10">
          {isSuccess ? (
            <div className="py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{t.successMsg}</h3>
              <p className="text-slate-500 font-medium">Redirecting you to dashboard...</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">{mode === 'login' ? t.welcome : t.create}</h2>
                <p className="text-slate-500 font-medium">{mode === 'login' ? 'Access your professional workspace' : 'Join 10M+ users today'}</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <div className="relative">
                    <User className={`absolute ${language === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                    <input type="text" placeholder={t.fullName} className={`w-full ${language === 'AR' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium`} required />
                  </div>
                )}
                
                <div>
                  <div className="relative">
                    <Mail className={`absolute ${language === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder={t.email} 
                      className={`w-full ${language === 'AR' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-4 bg-slate-50 border ${error ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-100'} rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium`} 
                      required 
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-xs font-bold animate-fade-in">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Lock className={`absolute ${language === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
                  <input type="password" placeholder={t.password} className={`w-full ${language === 'AR' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium`} required />
                </div>

                {mode === 'login' && (
                  <div className={language === 'AR' ? 'text-right' : 'text-left'}>
                    <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">{t.forgot}</button>
                  </div>
                )}

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group mt-2">
                  {mode === 'login' ? t.login : t.signup}
                  <ArrowRight size={20} className={`transition-transform group-hover:translate-x-1 ${language === 'AR' ? 'rotate-180' : ''}`} />
                </button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-400">
                  <span className="bg-white px-4">{t.or}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-600">
                  <Chrome size={18} className="text-red-500" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-600">
                  <Github size={18} className="text-slate-900" /> Github
                </button>
              </div>

              <div className="mt-10 text-center">
                <button 
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError(null);
                  }}
                  className="text-sm font-medium text-slate-500"
                >
                  {mode === 'login' ? t.noAccount : t.hasAccount} <span className="text-blue-600 font-black">{mode === 'login' ? t.signup : t.login}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
