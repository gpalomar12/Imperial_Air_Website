import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Building2, Home } from 'lucide-react';
import SiteEvaluationModal from './SiteEvaluationModal';

export default function ServiceSegmentation() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'commercial' | 'residential' }>({
    isOpen: false,
    type: 'commercial'
  });

  const openModal = (type: 'commercial' | 'residential') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark">Specialized HVAC Solutions</h2>
          <p className="text-brand-gray max-w-2xl mx-auto text-lg">
            We've shifted our focus to provide world-class commercial support while maintaining our residential excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Commercial Card (Primary) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-brand-dark text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border-t-8 border-brand-orange flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Building2 size={120} />
            </div>
            
            <div className="relative z-10 flex-grow">
              <div className="bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded inline-block mb-6">
                Primary Focus
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-6">Commercial HVAC Services</h3>
              <ul className="space-y-4 mb-10">
                {[
                  "Preventative Maintenance Contracts",
                  "Rooftop Units (RTUs)",
                  "Chillers & Large Systems",
                  "24/7 Emergency Service",
                  "Energy Efficiency Optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-orange shrink-0 mt-1" size={20} />
                    <span className="text-lg font-medium text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => openModal('commercial')}
              className="btn-primary w-full text-lg py-4"
            >
              Request a Site Evaluation
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Residential Card (Secondary) */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Home size={120} />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark mb-6">Residential HVAC</h3>
              <p className="text-brand-gray mb-8 text-lg">
                Reliable home comfort solutions for your family.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "AC Repair & Diagnostics",
                  "New System Installation",
                  "Seasonal Maintenance Plans",
                  "Indoor Air Quality Solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-blue shrink-0 mt-1" size={20} />
                    <span className="text-lg font-medium text-brand-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => openModal('residential')}
              className="btn-outline w-full text-lg py-4"
            >
              Schedule Home Service
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>

      <SiteEvaluationModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        type={modalState.type}
        initialService={modalState.type === 'commercial' ? 'General Commercial' : 'General Residential'}
      />
    </section>
  );
}
