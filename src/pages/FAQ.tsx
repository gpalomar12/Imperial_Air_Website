import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircleQuestion } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';

export default function FAQ() {
  const navigate = useNavigate();
  return (
    <div className="pt-32">
      <div className="bg-brand-dark text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-left mb-8">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Help Center & FAQ</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about AC repair, commercial HVAC maintenance, and how we serve the Rio Grande Valley.
            </p>
          </div>
        </div>
      </div>
      
      <FAQAccordion showTitle={false} />
      
      {/* Question CTA */}
      <div className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center border-2 border-brand-orange/20 rounded-[2rem] p-12 space-y-8 bg-brand-orange/5">
          <MessageCircleQuestion size={48} className="mx-auto text-brand-orange" />
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Still have questions?</h2>
          <p className="text-brand-gray text-lg max-w-xl mx-auto">
            Our team is here to help you understand your HVAC options and provide expert advice for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/contact')}
              className="btn-primary text-lg px-10 py-4"
            >
              Contact Support
            </button>
            <a 
              href="tel:9565663406"
              className="btn-outline text-lg px-10 py-4"
            >
              Call Us Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
