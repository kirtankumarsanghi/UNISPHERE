"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export function AICampusGuide({ collegeName }: { collegeName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hi! I'm an AI trained on reviews and student experiences from ${collegeName}. Ask me anything about the vibe, hostel food, coding culture, or placements!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let aiText = `I'm just a demo AI right now, but normally I'd give you the inside scoop on ${collegeName}!`;
      
      if (lowerInput.includes('food') || lowerInput.includes('hostel') || lowerInput.includes('mess')) {
        aiText = `From what students say, the hostel food is average. Breakfast is usually good (especially on dosa days!), but you might rely on the night canteen or Swiggy for dinner during exams.`;
      } else if (lowerInput.includes('culture') || lowerInput.includes('code') || lowerInput.includes('club')) {
        aiText = `The coding culture here is phenomenal. The primary tech club is very active, and you'll find people doing Leetcode or building projects in the library till 2 AM. There are also great cultural fests!`;
      } else if (lowerInput.includes('placement') || lowerInput.includes('job') || lowerInput.includes('salary')) {
        aiText = `Placements are solid, particularly for CS/IT branches where companies like Amazon and Microsoft visit. Core branches usually see mass recruiters, but many students opt for higher studies or off-campus tech roles.`;
      } else if (lowerInput.includes('attendance') || lowerInput.includes('strict')) {
        aiText = `They enforce a strict 75% attendance rule. You'll get debarred from exams if you fall short, so most students proxies or sleep in the back row during boring lectures!`;
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[#0F0F13] shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] transform overflow-hidden rounded-[2rem] glass-card border-white/10 shadow-2xl transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-bg-surface/50 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-headline-md text-[16px] text-on-surface">Campus AI Guide</h3>
              <p className="font-label-caps text-[9px] uppercase tracking-widest text-primary">Virtual Senior</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-white/10' : 'bg-primary/20 text-primary'}`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-[13px] font-body-md ${msg.sender === 'user' ? 'bg-primary text-[#0F0F13] rounded-tr-sm' : 'glass-panel rounded-tl-sm text-on-surface'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Bot size={14} />
              </div>
              <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-4 bg-bg-surface/30">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about hostel, culture, etc..."
              className="w-full rounded-full glass-panel border-white/5 bg-white/[0.03] py-3 pl-4 pr-12 text-[13px] font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[#0F0F13] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
