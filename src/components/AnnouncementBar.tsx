import React from 'react';
import { Sparkles, Zap, Clock, Users } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-dark overflow-hidden py-1.5 md:py-2 border-b border-white/5 relative z-[60]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-row items-center md:justify-center gap-6 md:gap-12 whitespace-nowrap overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-2 text-white font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] shrink-0">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange"></span>
          </span>
          <Clock size={10} className="text-brand-orange md:size-[12px]" />
          <span>24/7 No-Fee Service</span>
        </div>
        
        <div className="hidden md:block w-[1px] h-3 bg-white/20 shrink-0" />
        
        <div className="flex items-center gap-2 text-white font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] shrink-0">
          <Zap size={10} className="text-brand-blue md:size-[12px]" />
          <span>99.9% Approval</span>
        </div>

        <div className="hidden md:block w-[1px] h-3 bg-white/20 shrink-0" />

        <div className="flex items-center gap-2 text-white font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] shrink-0">
          <Sparkles size={10} className="text-brand-orange md:size-[12px]" />
          <span>Platinum Warranty</span>
        </div>

        <div className="hidden md:block w-[1px] h-3 bg-white/20 shrink-0" />

        <div className="flex items-center gap-2 text-brand-orange font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] shrink-0">
          <Users size={10} className="md:size-[12px]" />
          <span>Hablamos Español</span>
        </div>

        <a 
          href={`tel:${PHONE_NUMBER}`}
          className="md:hidden text-brand-orange font-black text-[9px] uppercase tracking-widest border-b border-brand-orange/30 shrink-0"
        >
          Call: {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
