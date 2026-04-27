import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  // ✅ FIX: was '/services/rtu' — corrected to match the actual route path
  '/services/rooftop-units': {
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
  // ✅ NEW: was missing
  '/portfolio': {
    title: 'HVAC Project Portfolio | Imperial Air LLC – Rio Grande Valley',
    description: 'View completed commercial and residential HVAC projects by Imperial Air LLC across the Rio Grande Valley. RTU installs, energy upgrades, and more.',
  },
  // ✅ NEW: was missing
  '/faq': {
    title: 'HVAC FAQ | Common AC & Heating Questions – Imperial Air LLC RGV',
    description: 'Answers to common HVAC questions for Rio Grande Valley homeowners and businesses. Learn about maintenance contracts, emergency service, and AC repair.',
  },
  // ✅ NEW: was missing
  '/areas': {
    title: 'HVAC Service Areas | Rio Grande Valley – Imperial Air LLC',
    description: 'Imperial Air LLC serves McAllen, Edinburg, Harlingen, Brownsville, Mission, Pharr, Weslaco, and all surrounding RGV communities.',
  },
  '/about': {
    title: 'About Imperial Air LLC | Licensed HVAC Contractor – Rio Grande Valley',
    description: 'Imperial Air LLC is a licensed HVAC contractor (TACLA 111452C) serving the Rio Grande Valley. Family-owned, bilingual, committed to quality commercial and residential HVAC service.',
  },
  '/contact': {
    title: 'Contact Imperial Air LLC | Free HVAC Estimate – RGV',
    description: 'Contact Imperial Air LLC for commercial HVAC proposals, emergency service, or residential AC repair. Call (956) 566-3406 or request a free estimate online.',
  },
   '/commercial-hvac-rgv': {
    title: 'Commercial HVAC Contractor RGV | Maintenance Contracts | Imperial Air LLC',
    description: 'Imperial Air LLC provides commercial HVAC services across the Rio Grande Valley. Maintenance contracts, rooftop unit repair, 24/7 emergency response for businesses in McAllen, Edinburg, Mission, Harlingen, and Brownsville. EPA certified. TACLA 111452C.',
  },
  // McAllen service+city combo pages
'/areas/mcallen/ac-repair': {
  title: 'AC Repair in McAllen, TX | Fast Same-Day Service | Imperial Air',
  description: 'Need AC repair in McAllen? Imperial Air LLC provides 2-hour emergency response, same-day repairs, and 24/7 service across McAllen (78501–78504). Call (956) 566-3406.',
},
'/areas/mcallen/ac-installation': {
  title: 'AC Installation in McAllen, TX | Imperial Air LLC',
  description: 'New AC installation in McAllen by licensed HVAC contractors. Right-sized systems for South Texas heat. Financing available. Call Imperial Air at (956) 566-3406.',
},
'/areas/mcallen/commercial-hvac': {
  title: 'Commercial HVAC McAllen TX | Maintenance Contracts | Imperial Air',
  description: 'Commercial HVAC services in McAllen TX. Maintenance contracts, RTU repair, 24/7 emergency service for businesses. Request a proposal from Imperial Air LLC.',
},
'/areas/mcallen/emergency': {
  title: '24/7 Emergency AC Repair McAllen TX | Imperial Air LLC',
  description: '24/7 emergency AC repair in McAllen, TX. 2-hour response, no service fees for contract clients. Call Imperial Air LLC now: (956) 566-3406.',
},

// Edinburg service+city combo pages
'/areas/edinburg/ac-repair': {
  title: 'AC Repair in Edinburg, TX | Fast Same-Day Service | Imperial Air',
  description: 'AC repair in Edinburg TX with 2-hour emergency response. Imperial Air LLC serves all of Edinburg (78539–78542) including UTRGV area. Call (956) 566-3406.',
},
'/areas/edinburg/ac-installation': {
  title: 'AC Installation in Edinburg, TX | Imperial Air LLC',
  description: 'New AC installation in Edinburg, TX by licensed HVAC contractors. Financing from $75/month. Imperial Air LLC — call (956) 566-3406 for a free estimate.',
},
'/areas/edinburg/commercial-hvac': {
  title: 'Commercial HVAC Edinburg TX | Maintenance Contracts | Imperial Air',
  description: 'Commercial HVAC maintenance contracts and emergency service in Edinburg TX. Imperial Air LLC serves offices, retail, and industrial facilities. Get a proposal today.',
},
'/areas/edinburg/emergency': {
  title: '24/7 Emergency AC Repair Edinburg TX | Imperial Air LLC',
  description: '24/7 emergency HVAC repair in Edinburg TX. 2-hour response target, no after-hours fees for contract clients. Call Imperial Air LLC: (956) 566-3406.',
},

// Mission
'/areas/mission/ac-repair': {
  title: 'AC Repair in Mission, TX | Imperial Air LLC',
  description: 'Fast AC repair in Mission TX including Sharyland. 2-hour emergency response, same-day service. Call Imperial Air LLC at (956) 566-3406.',
},
'/areas/mission/commercial-hvac': {
  title: 'Commercial HVAC Mission TX | Imperial Air LLC',
  description: 'Commercial HVAC service and maintenance contracts in Mission TX. Serving retail, offices, and warehouses. Call Imperial Air LLC for a free proposal.',
},

// Pharr
'/areas/pharr/ac-repair': {
  title: 'AC Repair in Pharr, TX | Imperial Air LLC',
  description: 'AC repair in Pharr TX with same-day service and 2-hour emergency response. Licensed HVAC technicians serving all of Pharr (78577). Call (956) 566-3406.',
},
'/areas/pharr/commercial-hvac': {
  title: 'Commercial HVAC Pharr TX | Imperial Air LLC',
  description: 'Commercial HVAC maintenance and repair in Pharr TX. Serving businesses near the Pharr-Reynosa Bridge and throughout the city. Call Imperial Air LLC.',
},

// Weslaco
'/areas/weslaco/ac-repair': {
  title: 'AC Repair in Weslaco, TX | Imperial Air LLC',
  description: 'AC repair in Weslaco TX. Same-day service, 2-hour emergency response. Imperial Air LLC serves all of Weslaco (78596). Call (956) 566-3406.',
},

// Harlingen
'/areas/harlingen/ac-repair': {
  title: 'AC Repair in Harlingen, TX | Imperial Air LLC',
  description: 'Fast AC repair in Harlingen TX. 2-hour emergency response, same-day service. Licensed HVAC serving all of Harlingen (78550–78552). Call (956) 566-3406.',
},

// Brownsville
'/areas/brownsville/ac-repair': {
  title: 'AC Repair in Brownsville, TX | Imperial Air LLC',
  description: 'AC repair in Brownsville TX with 2-hour emergency response. Serving all Brownsville zip codes (78520–78526). Call Imperial Air LLC at (956) 566-3406.',
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

const BASE_URL = 'https://imperialair-rgv.com';

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

    // ✅ FIX: Update canonical tag per-page (was hardcoded to homepage for all pages)
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `${BASE_URL}${path}`);
    }

  }, [location.pathname]);

  return null;
}