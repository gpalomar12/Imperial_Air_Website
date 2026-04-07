import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Retail Plaza RTU Replacement",
    description: "Full system upgrade for a 12-unit retail complex, improving energy efficiency by 28%.",
    image: "/images/comm_unit_crane.jpg",
    category: "Installation"
  },
  {
    id: 2,
    title: "Commercial Warehouse RTU Replacement",
    description: "Emergency repair and subsequent preventative maintenance plan for critical cooling systems.",
    image: "/images/comm_roof_top_unit_2.jpg",
    category: "Maintenance"
  },
  {
    id: 3,
    title: "Industrial Warehouse Ventilation",
    description: "Large-scale ventilation and climate control for a distribution center.",
    image: "/images/comm_unit_crane2.jpg",
    category: "Industrial"
  },
  {
    id: 4,
    title: "Commercial Unit Replacement",
    description: "Emergency unit replacement completed within 24 hours, restoring efficient climate control with minimal disruption.",
    image: "/images/comm_6.jpg",
    category: "Service"
  },
  {
    id: 5,
    title: "Restaurant Group Portfolio",
    description: "Ongoing preventative maintenance for a local restaurant group across 5 locations.",
    image: "/images/comm_5.jpg",
    category: "Maintenance"
  },
  {
    id: 6,
    title: "Charity Donations",
    description: "Donated one industrial fan for every 10 units sold to support the Palm Valley Animal Society.",
    image: "/images/local_commercial_work.jpg",
    category: "Charity Donation"
  },
  {
    id: 7,
    title: "Commercial Rooftop Replacement",
    description: "Replacement for a rooftop unit on a local shopping center.",
    image: "/images/comm_4.jpg",
    category: "Replacement"
  },
  {
    id: 8,
    title: "Local Business HVAC Estimate",
    description: "Prepared a detailed commercial estimate for a popular local restaurant, outlining cost-effective HVAC solutions",
    image: "/images/local_business.jpg",
    category: "Commercial Estimate"
  },
  {
    id: 9,
    title: "Brockerage Office HVAC Installation",
    description: "Installed an HVAC system for a new brokerage office construction, ensuring efficient and reliable climate control.",
    image: "/images/new_home_hvac.jpg",
    category: "Commercial"
  }
];

export default function ProjectShowcase() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">Project Showcase</h2>
            <p className="text-brand-gray max-w-xl text-lg">
              A look at our recent commercial HVAC projects across the Rio Grande Valley.
            </p>
          </div>
          <div className="flex items-center gap-4 border-b-2 border-brand-orange pb-2">
            <span className="text-brand-dark font-black uppercase tracking-widest text-sm">Proven Results</span>
            <CheckCircle2 className="text-brand-orange" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-lg border border-gray-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white text-brand-dark p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink size={24} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-dark group-hover:text-brand-orange transition-colors">
                  {project.title}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
