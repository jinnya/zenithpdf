
import React from 'react';
import { PDFTool, Language } from '../types';

interface ToolCardProps {
  tool: PDFTool;
  onClick: (tool: PDFTool) => void;
  language: Language;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, language }) => {
  const isAR = language === 'AR';
  const name = isAR && tool.nameAR ? tool.nameAR : tool.name;
  const description = isAR && tool.descriptionAR ? tool.descriptionAR : tool.description;

  return (
    <div 
      onClick={() => onClick(tool)}
      className="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 ${isAR ? 'right-0' : 'left-0'} w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className={`flex flex-col gap-4 ${isAR ? 'text-right' : 'text-left'}`}>
        <div className={`p-3 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 ${isAR ? 'mr-0 ml-auto' : ''}`}>
          {tool.icon}
        </div>
        
        <div>
          <div className={`flex items-center gap-2 ${isAR ? 'flex-row-reverse' : ''}`}>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            {tool.trending && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {isAR ? 'شائع' : 'Hot'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
