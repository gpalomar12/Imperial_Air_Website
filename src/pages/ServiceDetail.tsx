import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMMERCIAL_SERVICES } from '@/src/constants';
import { ArrowRight, FileText, ClipboardCheck, ArrowLeft } from 'lucide-react';
import SiteEvaluationModal from '../components/SiteEvaluationModal';
import ProposalRequestModal from '../components/ProposalRequestModal';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'proposal' | 'evaluation';
  }>({
    isOpen: false,
    type: 'proposal'
  });

  const service = COMMERCIAL_SERVICES.find(s => s.id === id);

  if (!service) return <div>Service not found</div>;

  const openProposal = () => setModalState({ isOpen: true, type: 'proposal' });
  const openEvaluation = () => setModalState({ isOpen: true, type: 'evaluation' });
  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-brand-gray hover:text-brand-orange font-bold uppercase tracking-widest text-sm mb-8 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Services
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight uppercase tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl text-brand-gray leading-relaxed max-w-3xl">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={openProposal}
              className="btn-primary text-lg px-8 py-4"
            >
              <FileText size={20} />
              Request a Proposal
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={openEvaluation}
              className="btn-outline text-lg px-8 py-4"
            >
              <ClipboardCheck size={20} />
              Request Site Evaluation
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-12 rounded-3xl border border-gray-200 space-y-6">
          <h2 className="text-3xl font-bold text-brand-dark">Why Choose Imperial Air?</h2>
          <p className="text-lg text-brand-gray leading-relaxed">
            We provide specialized expertise for commercial facilities in Edinburg and the surrounding RGV. Our technicians are highly trained in {service.title.toLowerCase()} and understand the critical nature of commercial HVAC uptime.
          </p>
          <ul className="space-y-3 text-brand-gray font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
              Licensed & Insured
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
              24/7 Emergency Support
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
              Commercial Scale Expertise
            </li>
          </ul>
        </div>
      </div>

      <ProposalRequestModal 
        isOpen={modalState.isOpen && modalState.type === 'proposal'} 
        onClose={closeModal} 
        initialService={service.title}
      />

      <SiteEvaluationModal 
        isOpen={modalState.isOpen && modalState.type === 'evaluation'} 
        onClose={closeModal} 
        type="commercial"
        initialService={service.title}
      />
    </div>
  );
}
