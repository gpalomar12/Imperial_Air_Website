import React, { useState } from 'react';
import { FileText, Calendar, ArrowRight } from 'lucide-react';
import SiteEvaluationModal from './SiteEvaluationModal';
import ProposalRequestModal from './ProposalRequestModal';

export default function SecondaryCTA() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'proposal' | 'evaluation';
  }>({
    isOpen: false,
    type: 'proposal'
  });

  const openProposal = () => setModalState({ isOpen: true, type: 'proposal' });
  const openEvaluation = () => setModalState({ isOpen: true, type: 'evaluation' });
  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <section id="request-proposal" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl honeycomb-bg">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-brand-dark/40 pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Need a Reliable <br />
            <span className="text-brand-orange">HVAC Partner?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Stop reacting to failures and start managing your assets. Request a custom proposal or schedule a site visit today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button 
              onClick={openProposal}
              className="btn-primary text-xl px-10 py-5 w-full sm:w-auto"
            >
              <FileText size={24} />
              Request a Proposal
            </button>
            <button 
              onClick={openEvaluation}
              className="bg-white text-brand-dark px-10 py-5 rounded-md font-bold text-xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Calendar size={24} />
              Schedule Site Visit
            </button>
          </div>
          
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest pt-4">
            Serving Edinburg, McAllen, Harlingen, Brownsville, and the entire RGV
          </p>
        </div>
      </div>

      <ProposalRequestModal 
        isOpen={modalState.isOpen && modalState.type === 'proposal'} 
        onClose={closeModal} 
        initialService="Replacement"
      />

      <SiteEvaluationModal 
        isOpen={modalState.isOpen && modalState.type === 'evaluation'} 
        onClose={closeModal} 
        type="commercial"
        initialService="General Commercial"
      />
    </section>
  );
}
