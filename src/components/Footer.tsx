import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Flame, Snowflake } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Logo + About */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Flame className="absolute -left-1 text-brand-orange fill-brand-orange" size={24} />
              <Snowflake className="absolute -right-1 text-brand-blue" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none">
                IMPERIAL <span className="text-brand-blue">AIR</span> <span className="text-[10px] font-bold">LLC</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange">
                COOLING AND HEATING
              </span>
            </div>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Professional HVAC solutions for commercial and residential properties across the entire Rio Grande Valley. Licensed, insured, and EPA certified.
          </p>
          <div className="text-xs font-mono text-white/40">
            LICENSE: TACLA00111452C
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-orange transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-brand-orange transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Services</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/services/maintenance" className="hover:text-brand-orange transition-colors">Preventative Maintenance</Link></li>
            <li><Link to="/services/rooftop-units" className="hover:text-brand-orange transition-colors">Rooftop Units (RTUs)</Link></li>
            <li><Link to="/services/chillers" className="hover:text-brand-orange transition-colors">Chillers & Large Systems</Link></li>
            <li><Link to="/services/emergency" className="hover:text-brand-orange transition-colors">24/7 Emergency Service</Link></li>
            <li><Link to="/services/upgrades" className="hover:text-brand-orange transition-colors">System Upgrades</Link></li>
          </ul>
        </div>

        {/* Column 3: Service Areas */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Service Areas</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/areas/edinburg" className="hover:text-brand-orange transition-colors">Edinburg, TX</Link></li>
            <li><Link to="/areas/mcallen" className="hover:text-brand-orange transition-colors">McAllen, TX</Link></li>
            <li><Link to="/areas/mission" className="hover:text-brand-orange transition-colors">Mission, TX</Link></li>
            <li><Link to="/areas/pharr" className="hover:text-brand-orange transition-colors">Pharr, TX</Link></li>
            <li><Link to="/areas/weslaco" className="hover:text-brand-orange transition-colors">Weslaco, TX</Link></li>
            <li><Link to="/areas/harlingen" className="hover:text-brand-orange transition-colors">Harlingen, TX</Link></li>
            <li><Link to="/areas/brownsville" className="hover:text-brand-orange transition-colors">Brownsville, TX</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Contact Info</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-brand-orange shrink-0" />
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-brand-orange transition-colors">{PHONE_NUMBER}</a>
            </li>
            <li className="flex items-start gap-3">
              <a 
                href={`mailto:${EMAIL}`} 
                className="flex items-start gap-3 hover:text-brand-orange transition-colors group"
              >
                <Mail size={18} className="text-brand-orange shrink-0 group-hover:text-brand-orange transition-colors" />
                <span>{EMAIL}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-orange shrink-0" />
              <span>{ADDRESS}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-xs">
        <p>© {new Date().getFullYear()} Imperial Air LLC. All Rights Reserved. TACLA00111452C</p>
      </div>
    </footer>
  );
}
