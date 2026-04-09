import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Flame, Snowflake, Construction } from 'lucide-react';
import { cn } from '../lib/utils';
import { PHONE_NUMBER, EMAIL } from '../constants';

const navLinks = [
  { name: 'Commercial Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Service Areas', path: '/areas' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Pages that have a light background at the top
  const isLightPage = ['/areas', '/services/maintenance'].includes(location.pathname) || 
                      location.pathname.startsWith('/services/') && !['/services/emergency', '/services/rooftop-units'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeDark = isScrolled || isLightPage;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        shouldBeDark ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      {/* Construction Banner - Integrated into Header */}
      <div className="bg-amber-400 text-black py-1.5 px-4 flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider">
        <Construction className="w-3 h-3 md:w-4 md:h-4" />
        <span>Site Update in Progress — RGV's Commercial HVAC Leader</span>
      </div>

      <div className={cn(
        "px-6 md:px-12 transition-all duration-300",
        shouldBeDark ? "py-3" : "py-6"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Flame className="absolute -left-1 text-brand-orange fill-brand-orange" size={24} />
              <Snowflake className="absolute -right-1 text-brand-blue" size={24} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-black tracking-tighter leading-none uppercase transition-colors duration-300",
                shouldBeDark ? "text-brand-dark" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                IMPERIAL <span className="text-brand-blue">AIR</span> <span className="text-[10px] font-bold">LLC</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange">
                COOLING AND HEATING
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "font-semibold transition-colors hover:text-brand-orange",
                  location.pathname === link.path 
                    ? "text-brand-orange" 
                    : shouldBeDark ? "text-brand-dark" : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <a 
                href={`tel:${PHONE_NUMBER}`} 
                className="btn-primary"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn(
              "lg:hidden transition-colors relative z-50",
              (shouldBeDark || isMobileMenuOpen) ? "text-brand-dark" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col p-8 pt-32 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-xl font-bold">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-orange"
              >
                {link.name}
              </Link>
            ))}
            <div className="space-y-4 pt-4">
              <a 
                href={`tel:${PHONE_NUMBER}`} 
                className="btn-primary w-full"
              >
                <Phone size={20} />
                Call Now: {PHONE_NUMBER}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
