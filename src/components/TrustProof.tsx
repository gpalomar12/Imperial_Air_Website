import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Star, ArrowRight, Quote } from 'lucide-react';

export default function TrustProof() {
  return (
    <section className="bg-gray-50 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Column 1: Certifications */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
            <ShieldCheck className="text-brand-orange" size={28} />
            Certifications
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              "EPA Certified",
              "NATE Certified",
              "Licensed & Insured",
              "Manufacturer Authorized"
            ].map((cert, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm">
                <Award className="text-brand-blue" size={20} />
                <span className="font-bold text-brand-gray">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Case Study */}
        <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={80} />
          </div>
          <h3 className="text-2xl font-black border-b border-white/10 pb-4">Case Study</h3>
          <div className="space-y-4">
            <h4 className="text-brand-orange font-bold text-xl">Retail Plaza HVAC Optimization</h4>
            <div className="space-y-2">
              <p className="text-sm text-white/60 uppercase font-bold tracking-widest">Problem</p>
              <p className="text-white/90">Frequent system failures and high energy bills.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/60 uppercase font-bold tracking-widest">Solution</p>
              <p className="text-white/90">Preventative maintenance + strategic upgrades.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/60 uppercase font-bold tracking-widest">Result</p>
              <p className="text-brand-blue font-bold text-lg">35% less downtime, lower energy costs.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-brand-orange font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
            View More Case Studies
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Column 3: Testimonials */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
            <Star className="text-brand-orange" size={28} />
            Testimonials
          </h3>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative">
            <Quote className="absolute top-6 right-6 text-gray-100" size={60} />
            <div className="relative z-10 space-y-6">
              <div className="flex text-yellow-500 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-lg italic text-brand-gray leading-relaxed">
                "Fast response and reliable service. They keep our facility running without interruptions. The preventative maintenance plan paid for itself in the first six months."
              </p>
              <div>
                <p className="font-black text-brand-dark">Facility Manager</p>
                <p className="text-sm text-brand-gray font-bold">Local Retail Plaza</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
