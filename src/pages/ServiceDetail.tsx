import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMMERCIAL_SERVICES, PHONE_NUMBER, EMAIL } from '../constants';
import { ArrowRight, FileText, ClipboardCheck, ArrowLeft, CheckCircle2, ShieldCheck, Zap, Settings, Mail } from 'lucide-react';
import SiteEvaluationModal from '../components/SiteEvaluationModal';
import ProposalRequestModal from '../components/ProposalRequestModal';
import SchemaMarkup from '../components/SchemaMarkup';
import { motion } from 'motion/react';

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

  const service = COMMERCIAL_SERVICES.find(s => s.id === id || s.path.split('/').pop() === id);

  if (!service) return (
    <div className="pt-32 pb-24 text-center">
      <h1 className="text-2xl font-bold">Service not found</h1>
      <button onClick={() => navigate('/services')} className="text-brand-orange mt-4 underline">Back to Services</button>
    </div>
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription,
    "provider": {
      "@type": "HVACBusiness",
      "name": "Imperial Air LLC"
    },
    "areaServed": "Rio Grande Valley",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.solutions.map(solution => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": solution
        }
      }))
    }
  };

  const openProposal = () => setModalState({ isOpen: true, type: 'proposal' });
  const openEvaluation = () => setModalState({ isOpen: true, type: 'evaluation' });
  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <div className="pt-24">
      <SchemaMarkup data={serviceSchema} />
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-brand-gray hover:text-brand-orange font-bold uppercase tracking-widest text-sm mb-12 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                <ShieldCheck size={16} />
                Commercial Expertise
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight uppercase tracking-tight">
                {service.title}
              </h1>
              <p className="text-xl text-brand-gray leading-relaxed">
                {service.longDescription}
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
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits & Solutions */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Benefits */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight flex items-center gap-3">
                <Zap className="text-brand-orange" size={32} />
                Key Benefits
              </h2>
              <p className="text-brand-gray text-lg">
                Why investing in professional {service.title.toLowerCase()} is critical for your facility.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-brand-orange/30 transition-colors">
                  <CheckCircle2 className="text-brand-orange shrink-0" size={24} />
                  <span className="text-brand-dark font-bold text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight flex items-center gap-3">
                <Settings className="text-brand-orange" size={32} />
                Our Solutions
              </h2>
              <p className="text-brand-gray text-lg">
                Specific technical solutions we provide to address your HVAC needs.
              </p>
            </div>
            <div className="space-y-6">
              {service.solutions.map((solution, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-orange flex items-center justify-center font-black text-xl shrink-0">
                    {i + 1}
                  </div>
                  <div className="h-px flex-grow bg-gray-100"></div>
                  <span className="text-brand-dark font-bold text-lg whitespace-nowrap">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">Ready to Optimize Your Facility?</h2>
          <p className="text-xl text-white/60">
            Contact Imperial Air today for a comprehensive evaluation of your commercial HVAC systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={openProposal} className="btn-primary px-10 py-4 text-lg">
              Get Started
              <ArrowRight size={20} />
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="btn-outline border-white text-white hover:bg-white hover:text-brand-dark px-10 py-4 text-lg">
              Call Now
            </a>
            <a 
              href={`mailto:${EMAIL}`} 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-dark px-10 py-4 text-lg"
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </div>
      </section>

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
