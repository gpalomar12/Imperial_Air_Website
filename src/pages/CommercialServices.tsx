import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COMMERCIAL_SERVICES } from '../constants';
import CommercialServicesGrid from '../components/CommercialServicesGrid';

export default function CommercialServices() {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      <div className="bg-brand-dark text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-left mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/60 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Commercial HVAC Solutions</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Specialized engineering and maintenance for commercial properties in Edinburg and the Rio Grande Valley.
            </p>
          </div>
        </div>
      </div>
      <CommercialServicesGrid showViewAll={false} />
    </div>
  );
}
