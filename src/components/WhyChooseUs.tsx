import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, Zap, Shield, Clock } from 'lucide-react';

const valueProps = [
  {
    title: "Reduce Downtime",
    description: "Reduce costly system failures with proactive monitoring.",
    icon: TrendingDown,
    color: "text-brand-orange"
  },
  {
    title: "Extend Equipment Life",
    description: "Extend lifespan of HVAC assets through expert care.",
    icon: Shield,
    color: "text-brand-blue"
  },
  {
    title: "Predictable Costs",
    description: "Transparent maintenance plans for better budgeting.",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Fast Response",
    description: "Priority emergency response for our commercial partners.",
    icon: Clock,
    color: "text-brand-dark"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">Why Choose Us?</h2>
          <p className="text-brand-gray max-w-2xl mx-auto text-lg">
            We focus on ROI and long-term asset management, not just quick fixes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className={`${prop.color} mb-6 transition-transform group-hover:scale-110`}>
                <prop.icon size={48} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-brand-dark mb-3">{prop.title}</h3>
              <p className="text-brand-gray font-medium leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
