import React from 'react';
import { Phone, AlertTriangle } from 'lucide-react';
import { PHONE_NUMBER } from '@/src/constants';

export default function EmergencyBanner() {
  return (
    <section className="bg-brand-orange text-white py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative pulse effect */}
      <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-full">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">🚨 HVAC Emergency? We Respond Fast.</h2>
            <p className="text-xl font-bold text-white/90">24/7 Service | Rapid Dispatch | Commercial Priority</p>
          </div>
        </div>
        
        <a 
          href={`tel:${PHONE_NUMBER}`} 
          className="bg-white text-brand-orange px-10 py-5 rounded-xl font-black text-2xl shadow-2xl hover:bg-gray-100 transition-all active:scale-95 flex items-center gap-3"
        >
          <Phone size={28} fill="currentColor" />
          Call Now
        </a>
      </div>
    </section>
  );
}
