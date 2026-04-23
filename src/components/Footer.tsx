import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS } from '../constants';
import BrandIcon from './BrandIcon';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Column 1: Logo + About */}
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <BrandIcon size={40} />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none whitespace-nowrap">
                IMPERIAL <span className="text-brand-blue">AIR</span> <span className="text-[10px] font-bold">LLC</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange whitespace-nowrap">
                COOLING AND HEATING
              </span>
            </div>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Professional HVAC solutions for commercial and residential properties across the entire RGV. Licensed, insured, and EPA certified.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-white/40">
              LICENSE: TACLA00111452C
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-orange border border-brand-orange/30 px-2 py-0.5 rounded">
              Hablamos Español
            </div>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/share/17bfELzWzQ/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-orange transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Services</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/services/maintenance" className="hover:text-brand-orange transition-colors">Maintenance</Link></li>
            <li><Link to="/services/rooftop-units" className="hover:text-brand-orange transition-colors">Rooftop Units</Link></li>
            <li><Link to="/services/chillers" className="hover:text-brand-orange transition-colors">Large Chillers</Link></li>
            <li><Link to="/services/emergency" className="hover:text-brand-orange transition-colors font-bold text-white">24/7 Response</Link></li>
            <li><Link to="/services/upgrades" className="hover:text-brand-orange transition-colors">System Upgrades</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Resources</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/portfolio" className="hover:text-brand-orange transition-colors">Portfolio</Link></li>
            <li><Link to="/faq" className="hover:text-brand-orange transition-colors font-bold text-white">Help & FAQ</Link></li>
            <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Get Quote</Link></li>
          </ul>
        </div>

        {/* Column 4: Service Areas */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Areas</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/areas/edinburg" className="hover:text-brand-orange transition-colors">Edinburg</Link></li>
            <li><Link to="/areas/mcallen" className="hover:text-brand-orange transition-colors">McAllen</Link></li>
            <li><Link to="/areas/mission" className="hover:text-brand-orange transition-colors">Mission</Link></li>
            <li><Link to="/areas/pharr" className="hover:text-brand-orange transition-colors">Pharr</Link></li>
            <li><Link to="/areas/weslaco" className="hover:text-brand-orange transition-colors">Weslaco</Link></li>
            <li><Link to="/areas/harlingen" className="hover:text-brand-orange transition-colors">Harlingen</Link></li>
            <li><Link to="/areas/brownsville" className="hover:text-brand-orange transition-colors">Brownsville</Link></li>
            <li><Link to="/areas/san-benito" className="hover:text-brand-orange transition-colors">San Benito</Link></li>
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
