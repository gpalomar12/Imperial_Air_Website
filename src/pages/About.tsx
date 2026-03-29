import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Users, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="bg-brand-dark py-24 px-6 md:px-12 text-white text-center relative">
        <div className="max-w-7xl mx-auto mb-8 text-left">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">About Imperial Air</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            The Rio Grande Valley's premier choice for commercial and residential HVAC solutions. Built on reliability, expertise, and a commitment to zero downtime.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            <Shield size={16} />
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight leading-tight">
            Keeping the RGV <br />
            <span className="text-brand-orange">Cool & Productive</span>
          </h2>
          <p className="text-lg text-brand-gray leading-relaxed">
            At Imperial Air LLC, we understand that in South Texas, HVAC isn't just a luxury—it's a critical component of business operations and home comfort. Our mission is to provide proactive, high-quality HVAC management that prevents failures before they happen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-2 uppercase tracking-tight">Expertise</h3>
              <p className="text-brand-gray text-sm">Licensed technicians with decades of combined experience in commercial systems.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-2 uppercase tracking-tight">Reliability</h3>
              <p className="text-brand-gray text-sm">24/7 emergency response and strict adherence to maintenance schedules.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800&h=800" 
              alt="Imperial Air HVAC Team" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white p-8 rounded-2xl shadow-xl hidden md:block">
            <p className="text-5xl font-black mb-1">15+</p>
            <p className="font-bold uppercase tracking-widest text-sm">Years of Local Service</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">Our Core Values</h2>
            <p className="text-brand-gray max-w-2xl mx-auto text-lg">
              The principles that guide every service call and installation we perform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="text-brand-orange" size={32} />,
                title: "Quality First",
                desc: "We never cut corners. Every repair and installation meets or exceeds industry standards."
              },
              {
                icon: <Users className="text-brand-orange" size={32} />,
                title: "Client Partnership",
                desc: "We don't just fix units; we manage your HVAC assets to ensure long-term value."
              },
              {
                icon: <Clock className="text-brand-orange" size={32} />,
                title: "Prompt Response",
                desc: "Time is money for businesses. We respond quickly to minimize downtime."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{value.title}</h3>
                <p className="text-brand-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
