import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component — manages per-page <title> and <meta description>.
 *
 * NOTE: The primary JSON-LD / HVACBusiness schema lives statically in index.html
 * so Google can read it without running JavaScript. This component only handles
 * per-page title and description overrides for React Router navigation.
 */

interface PageMeta { title: string; description: string; }

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Imperial Air LLC | Commercial & Residential HVAC – Rio Grande Valley',
    description: 'Imperial Air LLC provides commercial and residential HVAC services across the Rio Grande Valley. 24/7 emergency AC repair, preventative maintenance contracts, and system installations in McAllen, Edinburg, and beyond.',
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
    description: 'Imperial Air LLC is a licensed HVAC contractor (TX Lic. #220p9726) serving the Rio Grande Valley. Family-owned, bilingual, and committed to quality service.',
  },
  '/contact': {
    title: 'Contact Imperial Air LLC | Free HVAC Estimate – RGV',
    description: 'Contact Imperial Air LLC for commercial HVAC proposals, emergency service, or residential AC repair. Call (956) 566-3406 or request a free estimate online.',
  },
};

const CITY_META: Record<string, PageMeta> = {
  mcallen:     { title: 'Commercial HVAC in McAllen, TX | Imperial Air LLC',     description: 'Commercial and residential HVAC services in McAllen, TX. Emergency AC repair, maintenance contracts, and installations. Call (956) 566-3406.' },
  edinburg:    { title: 'Commercial HVAC in Edinburg, TX | Imperial Air LLC',    description: 'Imperial Air LLC is based in Edinburg, TX — 24/7 HVAC service across Hidalgo County. TX Lic. #220p9726.' },
  harlingen:   { title: 'Commercial HVAC in Harlingen, TX | Imperial Air LLC',   description: 'Commercial and residential HVAC repair and maintenance in Harlingen, TX. Imperial Air LLC serves all of Cameron County and the RGV.' },
  brownsville: { title: 'Commercial HVAC in Brownsville, TX | Imperial Air LLC', description: 'Expert commercial HVAC and AC repair in Brownsville, TX. Preventative maintenance contracts and 24/7 emergency service throughout the RGV.' },
  mission:     { title: 'Commercial HVAC in Mission, TX | Imperial Air LLC',     description: 'AC repair, maintenance, and HVAC installations for businesses and homes in Mission, TX. Imperial Air LLC serves the entire Rio Grande Valley.' },
  pharr:       { title: 'Commercial HVAC in Pharr, TX | Imperial Air LLC',       description: 'HVAC installation, repair, and maintenance in Pharr, TX. Imperial Air LLC serves commercial and residential clients across Hidalgo County.' },
  weslaco:     { title: 'Commercial HVAC in Weslaco, TX | Imperial Air LLC',     description: 'Commercial and residential AC repair and HVAC services in Weslaco, TX. Expert solutions throughout the Rio Grande Valley.' },
  'san-benito': { title: 'Commercial HVAC in San Benito, TX | Imperial Air LLC', description: 'HVAC repair and maintenance in San Benito, TX. Imperial Air LLC provides expert commercial and residential HVAC across the Rio Grande Valley.' },
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
        description: `Imperial Air LLC provides commercial and residential HVAC services in ${city}, TX. Call (956) 566-3406 for emergency service or a free estimate.`,
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