import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { PHONE_NUMBER, EMAIL } from '../constants';
import BrandIcon from './BrandIcon';
import AnnouncementBar from './AnnouncementBar';

const navLinks = [
  { name: 'Commercial Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Service areas', path: '/areas' },
  { name: 'About', path: '/about' },
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
        "fixed top-0 left-0 right-0 transition-all duration-300",
        isMobileMenuOpen ? "z-[100] bg-white text-brand-dark" : "z-50",
        (!isMobileMenuOpen && shouldBeDark) ? "bg-white shadow-md text-brand-dark" : 
        (!isMobileMenuOpen && !shouldBeDark) ? "bg-transparent text-white" : ""
      )}
    >
      <AnnouncementBar />
      <div className={cn(
        "px-6 md:px-12 transition-all duration-300",
        (shouldBeDark || isMobileMenuOpen) ? "py-2 md:py-3" : "py-4 md:py-6"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 md:gap-3 group">
            <BrandIcon className="size-8 md:size-10" />
            <div className="flex flex-col">
              <span className={cn(
                "text-xl md:text-2xl font-black tracking-tighter leading-none uppercase transition-colors duration-300 whitespace-nowrap",
                (shouldBeDark || isMobileMenuOpen) ? "text-brand-dark" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                IMPERIAL <span className="text-brand-blue">AIR</span> <span className="text-[10px] font-bold">LLC</span>
              </span>
              <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-brand-orange whitespace-nowrap">
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
              "lg:hidden transition-colors relative z-[80]",
              (shouldBeDark || isMobileMenuOpen) ? "text-brand-dark" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[70] lg:hidden flex flex-col p-8 pt-32 overflow-y-auto h-[100dvh]"
          >
            <nav className="flex flex-col gap-6 text-xl font-bold">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-brand-orange text-brand-dark block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="space-y-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href={`tel:${PHONE_NUMBER}`} 
                  className="btn-primary w-full justify-center text-lg"
                >
                  <Phone size={20} />
                  Call Now: {PHONE_NUMBER}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
