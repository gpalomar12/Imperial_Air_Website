import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component — sets per-page <title> and <meta description> on navigation.
 *
 * NOTE: The JSON-LD / HVACBusiness schema now lives in index.html (static HTML)
 * so Google can read it without JavaScript. This component handles
 * dynamic title/description only — do NOT add schema back here.
 */

interface PageMeta { title: string; description: string; }

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Imperial Air LLC | Commercial & Residential HVAC – Rio Grande Valley',
    description: 'Imperial Air LLC provides commercial and residential HVAC services across the Rio Grande Valley. 24/7 emergency AC repair, preventative maintenance contracts, and installations in McAllen, Edinburg, and beyond.',
  },
  '/services': {
    title: 'Commercial HVAC Services | Imperial Air LLC – RGV',
    description: 'Expert commercial HVAC in the Rio Grande Valley. Rooftop units, chillers, preventative maintenance contracts, 24/7 emergency service, and energy optimization for businesses of all sizes.',
  },
  '/services/maintenance': {
    title: 'Preventative Maintenance Contracts | Imperial Air LLC – RGV',
    description: 'Customized commercial HVAC preventative maintenance programs for facilities across the Rio Grande Valley. Reduce downtime and extend equipment life.',
  },
  '/services/rtu': {
    title: 'Rooftop Unit (RTU) Repair & Installation | Imperial Air LLC – RGV',
    description: 'Expert rooftop unit installation, repair, and maintenance for commercial buildings in the Rio Grande Valley. All major RTU brands serviced.',
  },
  '/services/chillers': {
    title: 'Chiller & Large System Service | Imperial Air LLC – RGV',
    description: 'Specialized chiller service and repair for large commercial facilities across the Rio Grande Valley. Water-cooled and air-cooled systems.',
  },
  '/services/emergency': {
    title: '24/7 Emergency HVAC Service | Imperial Air LLC – Rio Grande Valley',
    description: 'HVAC emergency? Imperial Air LLC provides 24/7 rapid-response AC and heating repair across the RGV. No service fees. Fast dispatch.',
  },
  '/services/upgrades': {
    title: 'Commercial HVAC System Upgrades | Imperial Air LLC – RGV',
    description: 'Modernize your facility with high-efficiency HVAC upgrades. Smart controls, energy-efficient equipment, and IAQ improvements across the Rio Grande Valley.',
  },
  '/services/optimization': {
    title: 'HVAC Energy Optimization | Imperial Air LLC – Rio Grande Valley',
    description: 'Reduce commercial energy bills with HVAC energy optimization from Imperial Air LLC. Audits, system balancing, and control logic tuning for RGV businesses.',
  },
  '/about': {
    title: 'About Imperial Air LLC | Licensed HVAC Contractor – Rio Grande Valley',
    description: 'Imperial Air LLC is a licensed HVAC contractor (TX Lic. #220p9726) serving the Rio Grande Valley. Family-owned, bilingual, committed to quality commercial and residential HVAC service.',
  },
  '/contact': {
    title: 'Contact Imperial Air LLC | Free HVAC Estimate – RGV',
    description: 'Contact Imperial Air LLC for commercial HVAC proposals, emergency service, or residential AC repair. Call (956) 566-3406 or request a free estimate online.',
  },
};

const CITY_META: Record<string, PageMeta> = {
  'mcallen':     { 
    title: 'AC Repair & HVAC Services in McAllen, TX | Imperial Air', 
    description: 'Expert AC repair in McAllen. We serve the area near La Plaza Mall with 24/7 HVAC support. Call (956) 566-3406 for your free service quote today.' 
  },
  'mission':     { 
    title: 'AC Repair & HVAC Services in Mission, TX | Imperial Air', 
    description: 'Expert AC repair in Mission. Serving Sharyland and all Mission neighborhoods with 24/7 HVAC support. Call (956) 566-3406 for a free estimate today!' 
  },
  'pharr':       { 
    title: 'AC Repair & HVAC Services in Pharr, TX | Imperial Air', 
    description: 'Expert AC repair in Pharr, TX. We serve neighborhoods near the Pharr-Reynosa Bridge with 24/7 HVAC support. Call (956) 566-3406 for a free estimate now!' 
  },
  'weslaco':     { 
    title: 'AC Repair & HVAC Services in Weslaco, TX | Imperial Air', 
    description: 'Expert AC repair in Weslaco, TX. Serving neighborhoods near Estero Llano Grande with 24/7 HVAC support. Call (956) 566-3406 for a free estimate today!' 
  },
  'edinburg':    { 
    title: 'AC Repair & HVAC Experts in Edinburg, TX | Imperial Air', 
    description: 'Need fast AC repair in Edinburg? From UTRGV to north Edinburg, Imperial Air offers 24/7 HVAC service. Call (956) 566-3406 for a free estimate today!' 
  },
  'harlingen':   { 
    title: 'AC Repair & HVAC Services in Harlingen, TX | Imperial Air', 
    description: 'Expert AC repair in Harlingen, TX. Near the Iwo Jima Memorial? We offer 24/7 HVAC support and free estimates. Call (956) 566-3406 to stay cool today!' 
  },
  'brownsville': { 
    title: 'AC Repair & HVAC Services in Brownsville, TX | Imperial Air', 
    description: 'Expert AC repair in Brownsville, TX. Serving neighborhoods near Gladys Porter Zoo with 24/7 support. Call (956) 566-3406 for a free estimate today!' 
  },
  'san-benito':  { 
    title: 'AC Repair & HVAC Services in San Benito, TX | Imperial Air', 
    description: 'Expert AC repair in San Benito, TX. Locally serving the San Benito area with 24/7 emergency HVAC support. Call (956) 566-3406 for a free estimate today!' 
  },
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const cityMatch = path.match(/^\/areas\/([^/]+)$/);
    let meta: PageMeta | undefined;

    if (cityMatch) {
      const city = cityMatch[1].toLowerCase();
      meta = CITY_META[city] ?? {
        title: `HVAC Services in ${city.charAt(0).toUpperCase() + city.slice(1)}, TX | Imperial Air LLC`,
        description: `Imperial Air LLC provides commercial and residential HVAC services in ${city}, TX. Call (956) 566-3406.`,
      };
    } else {
      meta = PAGE_META[path];
    }

    if (meta) {
      document.title = meta.title;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) descTag.setAttribute('content', meta.description);
    }
  }, [location.pathname]);

  return null;
}