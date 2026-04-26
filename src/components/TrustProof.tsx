import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, ArrowRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../constants';

export default function TrustProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Column 1: Certifications */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-brand-dark flex items-center gap-3 uppercase tracking-tight">
            <ShieldCheck className="text-brand-orange" size={28} />
            Certifications
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              "EPA Certified",
              "Licensed & Insured",
              "Manufacturer Authorized"
            ].map((cert, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm hover:border-brand-orange transition-colors">
                <Award className="text-brand-blue" size={20} />
                <span className="font-bold text-brand-gray">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Case Study */}
        <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={80} />
          </div>
          <h3 className="text-2xl font-black border-b border-white/10 pb-4 uppercase tracking-tight">Case Study</h3>
          
          <div className="rounded-xl overflow-hidden mb-4 border border-white/10">
            <img 
              src="/images/digital_thermostat.jpg" 
              alt="Smart Thermostat Optimization" 
              className="w-full h-32 object-cover opacity-80"
              width="600"
              height="128"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-4 flex-grow">
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
              <p className="text-brand-blue font-bold text-lg">80% less downtime, lower energy cost.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-brand-orange font-black uppercase tracking-widest text-sm hover:gap-4 transition-all mt-6">
            View More Case Studies
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Column 3: Testimonials Carousel */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-orange">
            <Quote size={80} />
          </div>
          <h3 className="text-2xl font-black text-brand-dark border-b border-gray-100 pb-4 uppercase tracking-tight mb-6">Testimonials</h3>
          
          <div className="relative flex-grow min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex text-yellow-500 gap-1">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-brand-gray italic leading-relaxed text-lg">
                  "{TESTIMONIALS[currentTestimonial].text}"
                </p>
                <div>
                  <p className="font-black text-brand-dark uppercase tracking-tight">{TESTIMONIALS[currentTestimonial].name}</p>
                  <p className="text-brand-orange text-sm font-bold">{TESTIMONIALS[currentTestimonial].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentTestimonial ? 'w-8 bg-brand-orange' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
