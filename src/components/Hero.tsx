import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, FileText, Shield } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import ProposalRequestModal from './ProposalRequestModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[auto] lg:min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden honeycomb-bg pb-12 md:pb-0">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/90 to-transparent z-0"></div>
      
      {/* Decorative Orange Angle - Hidden on mobile for less clutter */}
      <div className="hidden md:block absolute top-0 left-0 w-1/3 h-full bg-brand-orange/10 -skew-x-12 -translate-x-1/2 z-0"></div>

      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-3 md:px-4 py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-wider">
              <Shield size={14} className="md:size-4" />
              HVAC & Residential Specialists
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 md:px-4 py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-wider border border-white/10 backdrop-blur-sm">
              <span className="text-brand-orange">●</span>
              100% Hablamos Español
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Commercial & Residential HVAC Services in the <span className="text-brand-orange">RGV</span>
            <br />
            <span className="text-2xl md:text-4xl font-bold text-white/50">Reliable Systems. Zero Downtime.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            Preventative maintenance, emergency response, and long-term HVAC solutions. We keep the RGV running cool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              <Phone size={18} className="md:size-5" />
              Call Now
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <FileText size={18} className="md:size-5" />
              Request a Proposal
            </button>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mt-8 md:mt-0"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white max-w-[500px] mx-auto lg:max-w-none">
            <img 
              src="/images/comm_roof_top_unit.jpg" 
              alt="Commercial HVAC Rooftop Unit Installation" 
              className="w-full aspect-[4/3] md:aspect-auto object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Badge - More compact on mobile */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-brand-dark/90 backdrop-blur-sm text-white p-3 md:p-6 rounded-xl shadow-xl max-w-[150px] md:max-w-[240px]">
              <p className="text-brand-orange font-black text-2xl md:text-4xl mb-0 md:mb-1 leading-none">24/7</p>
              <p className="font-bold text-[10px] md:text-sm leading-tight">Emergency Support Available</p>
            </div>
          </div>
          
          {/* Decorative Elements - Hidden on mobile */}
          <div className="hidden md:block absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
          <div className="hidden md:block absolute -bottom-10 -left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>

      <ProposalRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialService="Replacement"
      />
    </section>
  );
}
