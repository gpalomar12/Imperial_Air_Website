import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Building2, 
  ThermometerSnowflake, 
  Clock, 
  Zap, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { COMMERCIAL_SERVICES } from '../constants';

const iconMap: Record<string, any> = {
  ShieldCheck,
  Building2,
  ThermometerSnowflake,
  Clock,
  Zap,
  Settings
};

interface CommercialServicesGridProps {
  showViewAll?: boolean;
}

export default function CommercialServicesGrid({ showViewAll = true }: CommercialServicesGridProps) {
  return (
    <section className="bg-brand-dark py-24 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Commercial Services</h2>
            <p className="text-white/60 max-w-xl text-lg">
              Comprehensive HVAC solutions designed for the unique demands of commercial facilities.
            </p>
          </div>
          {showViewAll && (
            <Link to="/services" className="btn-primary">
              View All Services
              <ArrowRight size={20} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMERCIAL_SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div 
                key={service.id}
                whileHover={{ scale: 1.02 }}
                className="bg-brand-gray/50 p-8 rounded-2xl border border-white/5 hover:border-brand-orange/50 transition-all flex flex-col"
              >
                <div className="text-brand-orange mb-6">
                  <Icon size={40} />
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  to={service.path} 
                  className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
