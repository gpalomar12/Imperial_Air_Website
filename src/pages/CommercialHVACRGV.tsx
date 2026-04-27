import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Settings, 
  Clock, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Phone,
  BarChart3,
  HardHat,
  Warehouse
} from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import { Link } from 'react-router-dom';

const commercialFeatures = [
  {
    icon: <BarChart3 className="text-brand-orange" />,
    title: "Preventative Maintenance",
    desc: "Scheduled inspections to identify issues before they cause costly downtime. Custom plans for retail, office, and industrial properties."
  },
  {
    icon: <Settings className="text-brand-orange" />,
    title: "Rooftop Unit (RTU) Experts",
    desc: "Specialized service for packaged rooftop units of all tonnages. Expert diagnostics, repair, and high-efficiency replacement."
  },
  {
    icon: <Zap className="text-brand-orange" />,
    title: "Priority Emergency Response",
    desc: "Commercial clients with maintenance contracts receive 24/7 priority emergency dispatch to protect your business operations."
  },
  {
    icon: <ShieldCheck className="text-brand-orange" />,
    title: "Licensed & EPA Certified",
    desc: "Fully licensed (TACLA 111452C) and EPA certified technicians qualified for complex commercial refrigerants and systems."
  }
];

const industries = [
  { name: "Retail Centers", icon: <Building2 /> },
  { name: "Restaurants", icon: <Zap /> },
  { name: "Medical Offices", icon: <ShieldCheck /> },
  { name: "Warehouses", icon: <Warehouse /> },
  { name: "Educational Facilities", icon: <HardHat /> },
  { name: "Office Buildings", icon: <Building2 /> }
];

export default function CommercialHVACRGV() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 honeycomb-bg" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
            >
              <Building2 size={16} />
              Enterprise Solutions
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none"
            >
              Commercial HVAC <br />
              <span className="text-brand-orange">Contractor RGV</span>
            </motion.h1 >
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Zero downtime is our standard. Imperial Air LLC provides robust HVAC maintenance, 
              repair, and installation for businesses across McAllen, Edinburg, and the entire Rio Grande Valley.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-lg px-10 py-5">
                <Phone size={20} />
                Request Commercial Quote
              </a>
              <Link to="/contact" className="btn-secondary text-lg px-10 py-5">
                Speak to a Specialist
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">
              Built for the <span className="text-brand-orange">South Texas</span> Business
            </h2>
            <p className="text-brand-gray text-lg">
              The RGV heat is punishing for commercial systems. We specialize in keeping 
              your staff comfortable and your critical infrastructure cool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commercialFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 flex flex-col items-center text-center space-y-4 group hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gray-50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight leading-none">
                Industries <br />
                <span className="text-brand-orange">We Service</span>
              </h2>
              <p className="text-brand-gray text-lg leading-relaxed">
                We understand that every industry has different HVAC requirements. 
                Whether it's the high filtration needs of a medical clinic or the 
                heavy humidity control needed for a busy RGV restaurant, our team 
                delivers custom solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {industries.map((industry, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-bold text-brand-dark p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-brand-orange">{industry.icon}</div>
                    {industry.name}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link to="/contact" className="btn-primary">
                  Download Sample Maintenance Plan
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-brand-dark rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                  alt="Modern Commercial HVAC System" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent flex flex-col justify-end p-10">
                  <div className="bg-brand-orange text-white px-4 py-2 rounded-lg font-black uppercase text-sm w-fit mb-4">
                    Case Study
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Multi-Unit Retail Cooling Optimization
                  </h3>
                  <p className="text-white/70">
                    Reduced energy costs by 22% for a local McAllen shopping center 
                    through smart controller installation and retrofitting.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-orange rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                <span className="text-2xl font-black leading-none">22%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Savings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden honeycomb-bg">
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
              <div className="space-y-6 max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Protect Your <br />
                  <span className="text-brand-orange">Bottom Line</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  Regular maintenance is the only way to prevent major RGV heat-related failures 
                  that can shutdown your business. Our maintenance contracts are designed for 
                  longevity and efficiency.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><Clock className="text-brand-orange" size={16} /> 2-Hr Response</span>
                  <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><CheckCircle2 className="text-brand-orange" size={16} /> All Brands</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-brand-orange mb-2">0</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/50">Emergency Fees (Contracts)</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
                  <div className="text-4xl font-black text-brand-orange mb-2">15+</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/50">Years RGV Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">
              Ready to Upgrade Your <span className="text-brand-orange">Commercial HVAC?</span>
            </h2>
            <p className="text-brand-gray text-xl">
              From emergency repairs to comprehensive maintenance contracts, Imperial Air LLC 
              is the RGV's trusted partner for commercial indoor comfort.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-xl px-12 py-6">
              <Phone size={24} />
              Call Now: {PHONE_NUMBER}
            </a>
            <Link to="/contact" className="btn-secondary text-xl px-12 py-6">
              Request Free Proposal
            </Link>
          </div>
          <div className="pt-4 text-brand-gray/50 font-bold uppercase tracking-widest text-xs">
            Bilingual Technicians • Hablamos Español • Licensed TACLA 111452C
          </div>
        </div>
      </section>
    </div>
  );
}
