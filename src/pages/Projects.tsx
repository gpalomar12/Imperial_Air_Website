import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ProjectShowcase from '../components/ProjectShowcase';

export default function Projects() {
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
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Project Showcase</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Real-world HVAC solutions delivered across the Rio Grande Valley. From critical commercial repairs to community initiatives.
            </p>
          </div>
        </div>
      </div>
      
      {/* We reuse the component but we might want to tweak its internal section padding if it's now sub-content */}
      <ProjectShowcase showTitle={false} />
      
      {/* Imperial CTA */}
      <div className="bg-gray-50 py-20 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <CheckCircle2 size={48} className="mx-auto text-brand-orange" />
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight">Need a Partner for Your Next Project?</h2>
          <p className="text-brand-gray text-lg">
            We provide detailed estimates and comprehensive project management for commercial facilities.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary text-lg px-10 py-4 mx-auto"
          >
            Get a Free Estimate
          </button>
        </div>
      </div>
    </div>
  );
}
