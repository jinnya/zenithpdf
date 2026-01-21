
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const navigate = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 mb-20">
          <div className="col-span-2">
            <div className="mb-8 cursor-pointer" onClick={navigate('')}>
              <Logo size={32} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-sm font-medium">
              ZenithPDF is the ultimate online destination for professional PDF manipulation. Secure, fast, and free for everyone.
            </p>
            <div className="flex gap-6 mt-10">
              <Twitter className="h-6 w-6 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-slate-400 hover:text-blue-700 cursor-pointer transition-colors" />
              <Github className="h-6 w-6 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
              <Mail className="h-6 w-6 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-bold">
              <li><a href="#" onClick={navigate('')} className="hover:text-blue-600 transition-colors">Home Page</a></li>
              <li><a href="#about" onClick={navigate('about')} className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#privacy" onClick={navigate('privacy')} className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-bold">
              <li><a href="#developer" onClick={navigate('developer')} className="hover:text-blue-600 transition-colors">Developer API</a></li>
              <li><a href="#help" onClick={navigate('help')} className="hover:text-blue-600 transition-colors">Desktop App</a></li>
              <li><a href="#help" onClick={navigate('help')} className="hover:text-blue-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Trust</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-bold">
              <li><a href="#privacy" onClick={navigate('privacy')} className="hover:text-blue-600 transition-colors">GDPR & Security</a></li>
              <li><a href="#about" onClick={navigate('about')} className="hover:text-blue-600 transition-colors">System Status</a></li>
              <li><a href="#help" onClick={navigate('help')} className="hover:text-blue-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2024 ZenithPDF Global Inc. Designed for precision.
          </p>
          <div className="flex gap-8">
            <span className="text-xs text-slate-400 font-black tracking-widest uppercase">SSL SECURED</span>
            <span className="text-xs text-slate-400 font-black tracking-widest uppercase">Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
