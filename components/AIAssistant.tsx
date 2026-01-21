
import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm Zenith AI. How can I help you manage your PDFs today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Correct: Use process.env.API_KEY directly in initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: You are ZenithPDF Assistant. Suggest the best PDF tool for this request: "${userMsg}". Tools available: Merge, Split, Compress, Convert, OCR, Sign. Keep it short.`,
      });
      // Correct: Use .text property directly
      setChat(prev => [...prev, { role: 'bot', text: response.text || "I recommend using our standard conversion tool." }]);
    } catch (e) {
      setChat(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble right now, but you can find all tools in our Solutions menu!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center gap-3 group"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold pr-2 hidden md:block">Zenith AI</span>
        </button>
      ) : (
        <div className="bg-white w-80 md:w-96 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot />
              <span className="font-black tracking-tight">Zenith Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg">
              <X size={20} />
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <Loader2 className="animate-spin text-blue-600" size={16} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
