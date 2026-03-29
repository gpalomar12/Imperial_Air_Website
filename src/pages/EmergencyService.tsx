import React, { useState } from 'react';
import { Phone, Clock, AlertTriangle, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PHONE_NUMBER } from '@/src/constants';
import ProposalRequestModal from '../components/ProposalRequestModal';

export default function EmergencyService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <div className="bg-brand-orange text-white py-16 px-6 md:px-12 text-center">
        <div className="max-w-7xl mx-auto mb-8 text-left">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-brand-dark font-bold uppercase tracking-widest text-sm transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center">
            <AlertTriangle size={80} className="animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">24/7 Emergency HVAC</h1>
          <p className="text-2xl font-bold text-white/90">
            Rapid Dispatch for Commercial Critical Failures in the RGV.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="inline-flex items-center gap-4 bg-white text-brand-orange px-12 py-6 rounded-2xl font-black text-3xl shadow-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              <Phone size={32} fill="currentColor" />
              {PHONE_NUMBER}
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-4 bg-brand-dark text-white px-10 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:bg-black transition-all active:scale-95"
            >
              <FileText size={28} />
              Request Proposal
            </button>
          </div>
        </div>
      </div>

      <div className="section-padding grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-black text-brand-dark">We Understand the Cost of Downtime.</h2>
          <p className="text-lg text-brand-gray leading-relaxed">
            When your commercial HVAC system fails, it's not just an inconvenience—it's a loss of revenue, productivity, and comfort. We prioritize commercial emergency calls to get your business back up and running as fast as possible.
          </p>
          <ul className="space-y-4">
            {[
              "Same-day emergency response",
              "Priority dispatch for contract clients",
              "Expert diagnostics for large systems",
              "Fully stocked service vehicles"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-brand-dark">
                <Clock className="text-brand-orange" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1599700403969-f77b3aa74837?auto=format&fit=crop&q=80&w=800&h=600" 
            alt="Emergency HVAC service" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <ProposalRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialService="Repair"
      />
    </div>
  );
}
