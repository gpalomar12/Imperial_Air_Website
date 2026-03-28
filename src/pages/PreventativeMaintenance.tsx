import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProposalRequestModal from '../components/ProposalRequestModal';

export default function PreventativeMaintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <div className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-brand-gray hover:text-brand-orange font-bold uppercase tracking-widest text-sm transition-colors group mb-12"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              <ShieldCheck size={16} />
              Asset Protection
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight">
              Preventative <br />
              <span className="text-brand-orange">Maintenance Plans</span>
            </h1>
            <p className="text-xl text-brand-gray leading-relaxed">
              Stop reacting to failures. Our custom maintenance contracts are designed to extend equipment life, reduce energy costs, and ensure zero downtime for your facility.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Request a Custom Plan
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/maintenance/800/600" 
              alt="Technician performing maintenance" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="section-padding">
        <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-tight">What's Included in Our Plans?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Quarterly Inspections", desc: "Thorough checks of all mechanical components, electrical connections, and refrigerant levels." },
            { title: "Priority Response", desc: "Maintenance clients get moved to the front of the line for any emergency calls." },
            { title: "Detailed Reporting", desc: "Full digital reports after every visit, tracking the health and ROI of your HVAC assets." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-4">
              <CheckCircle2 className="text-brand-orange" size={32} />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-brand-gray">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <ProposalRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialService="Maintenance"
      />
    </div>
  );
}
