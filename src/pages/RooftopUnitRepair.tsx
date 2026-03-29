import React, { useState } from 'react';
import { Building2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SiteEvaluationModal from '../components/SiteEvaluationModal';

export default function RooftopUnitRepair() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <div className="bg-brand-dark text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-brand-orange font-bold uppercase tracking-widest text-sm transition-colors group mb-12"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              <Building2 size={16} />
              Commercial RTU Specialists
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Rooftop Unit (RTU) <br />
              <span className="text-brand-orange">Repair & Install</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Specialized service for commercial rooftop units. From complex repairs to full system replacements, we handle the scale of your facility.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Request RTU Inspection
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src="/images/comm_roof_top_unit_2.jpg" 
              alt="Commercial Rooftop HVAC Units" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Our RTU Expertise</h2>
            <p className="text-lg text-brand-gray leading-relaxed">
              Rooftop units are the workhorses of commercial HVAC. They require specialized knowledge of high-voltage electrical, complex control systems, and large-scale refrigeration.
            </p>
            <div className="space-y-4">
              {[
                "Package Unit Repair & Maintenance",
                "Economizer Tuning & Repair",
                "Variable Frequency Drive (VFD) Service",
                "Gas Heating & Heat Pump RTUs",
                "Full System Design & Replacement"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-brand-dark">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200">
            <h3 className="text-2xl font-black mb-6">Common RTU Issues We Fix:</h3>
            <ul className="space-y-4 text-brand-gray list-disc pl-5">
              <li>Failed compressors or condenser fan motors</li>
              <li>Refrigerant leaks and low charge issues</li>
              <li>Faulty ignition systems or heat exchangers</li>
              <li>Clogged condensate drains causing leaks</li>
              <li>Worn belts and pulleys affecting airflow</li>
              <li>Thermostat and control system communication errors</li>
            </ul>
          </div>
        </div>
      </div>

      <SiteEvaluationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="commercial"
        initialService="Rooftop Units (RTUs)"
      />
    </div>
  );
}
