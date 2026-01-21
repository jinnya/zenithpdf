
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform group-hover:scale-110 duration-300"
        >
          {/* Background Shape: A mix between a document and a peak */}
          <rect width="40" height="40" rx="10" className="fill-blue-600" />
          
          {/* Stylized 'Z' with a document fold feel */}
          <path 
            d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V15L16 25H28C29.1046 25 30 25.8954 30 27V28C30 29.1046 29.1046 30 28 30H12C10.8954 30 10 29.1046 10 28V25L24 15H12C10.8954 15 10 14.1046 10 13V12Z" 
            fill="white" 
          />
          
          {/* Accent: Zenith Peak detail */}
          <path 
            d="M30 10L30 18L22 10H30Z" 
            fill="white" 
            fillOpacity="0.3"
          />
        </svg>
        <div className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
      <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
        Zenith<span className="text-blue-600 italic">PDF</span>
      </span>
    </div>
  );
};

export default Logo;
