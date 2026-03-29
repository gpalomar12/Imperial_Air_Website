import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Star, ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/src/constants';

export default function TrustProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3">
              <Star className="text-brand-orange" size={28} />
              Testimonials
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="relative h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between"
              >
                <Quote className="absolute top-6 right-6 text-gray-100" size={60} />
                <div className="relative z-10 space-y-6">
                  <div className="flex text-yellow-500 gap-1">
                    {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg italic text-brand-gray leading-relaxed">
                    "{TESTIMONIALS[currentTestimonial].text}"
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-gray-50">
                  <p className="font-black text-brand-dark">{TESTIMONIALS[currentTestimonial].name}</p>
                  <p className="text-sm text-brand-gray font-bold">{TESTIMONIALS[currentTestimonial].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Progress Dots */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'w-6 bg-brand-orange' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
