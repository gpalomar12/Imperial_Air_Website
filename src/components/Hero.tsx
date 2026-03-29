import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, FileText, Star, Shield, Award } from 'lucide-react';
import { PHONE_NUMBER } from '@/src/constants';
import ProposalRequestModal from './ProposalRequestModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden honeycomb-bg">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/80 to-transparent z-0"></div>
      
      {/* Decorative Orange Angle */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-orange/10 -skew-x-12 -translate-x-1/2 z-0"></div>

      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            <Shield size={16} />
            Commercial HVAC Specialists
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Commercial HVAC Services in the <span className="text-brand-orange">Rio Grande Valley</span>
            <br />
            <span className="text-3xl md:text-4xl font-bold text-white/60">Reliable Systems. Zero Downtime.</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-xl leading-relaxed">
            Preventative maintenance, emergency response, and long-term HVAC solutions for commercial properties and facilities. We keep your business running cool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-lg px-8 py-4">
              <Phone size={20} />
              Call Now
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary text-lg px-8 py-4"
            >
              <FileText size={20} />
              Request a Proposal
            </button>
          </div>
          
          {/* Trust Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="font-bold text-sm text-white">4.9 Rating | 150+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-semibold text-sm">
              <Award size={18} className="text-brand-blue" />
              Licensed & Insured | EPA Certified
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Commercial HVAC Unit Installation" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 bg-brand-dark text-white p-6 rounded-xl shadow-xl max-w-[240px]">
              <p className="text-brand-orange font-black text-4xl mb-1">24/7</p>
              <p className="font-bold text-sm leading-tight">Emergency Commercial Support Available</p>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
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
