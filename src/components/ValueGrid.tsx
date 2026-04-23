import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Wallet, Headphones, CheckCircle2 } from 'lucide-react';
import { VALUE_PROPS } from '../constants';

const advantages = [
  {
    ...VALUE_PROPS.WARRANTY,
    icon: ShieldCheck,
    color: 'orange',
    details: [
      'Comprehensive Parts Coverage',
      'Labor Warranty Included',
      'Transferable to New Owners',
      'Elite System Certification'
    ]
  },
  {
    ...VALUE_PROPS.FINANCING,
    icon: Wallet,
    color: 'blue',
    details: [
      '99.9% Application Approval',
      'Streamlined Approval Process',
      'Payments starting at $75 a month',
      'Competitive Seasonal Rates'
    ]
  },
  {
    ...VALUE_PROPS.EMERGENCY,
    icon: Headphones,
    color: 'orange',
    details: [
      'True 24/7/365 Dispatch',
      '$0 Service Fees (Contracts)',
      'Fast Response Guarantee',
      'Fully Stocked Service Vans'
    ]
  }
];

export default function ValueGrid() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-orange">The Imperial Advantage</h2>
            <h3 className="text-4xl md:text-6xl font-black text-brand-dark leading-tight uppercase">
              Elite Service, <br />
              <span className="text-brand-blue">No Compromise.</span>
            </h3>
          </div>
          <p className="text-brand-gray text-lg max-w-sm font-medium leading-relaxed">
            We provide the high-end security and flexibility that other HVAC companies can't match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-white relative group"
            >
              <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
                item.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-blue/10 text-brand-blue'
              }`}>
                <item.icon size={28} />
              </div>
              
              <div className="space-y-4 mb-8">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                  item.color === 'orange' ? 'bg-brand-orange text-white' : 'bg-brand-blue text-white'
                }`}>
                  {item.highlight}
                </span>
                <h4 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{item.title}</h4>
                <p className="text-brand-gray font-medium">{item.description}</p>
              </div>

              <ul className="space-y-3 pt-6 border-t border-gray-100">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-brand-dark/70">
                    <CheckCircle2 size={16} className={item.color === 'orange' ? 'text-brand-orange' : 'text-brand-blue'} />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
