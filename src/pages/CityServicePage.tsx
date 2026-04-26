import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Phone, ArrowLeft, CheckCircle2, Clock, Shield, Star, Zap } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import SchemaMarkup from '../components/SchemaMarkup';

// ── City display names & zip codes ───────────────────────────────────────────
const CITY_INFO: Record<string, { name: string; zip: string; landmark: string }> = {
  'mcallen':     { name: 'McAllen',     zip: '78501–78504', landmark: 'near La Plaza Mall and 10th Street corridor' },
  'edinburg':    { name: 'Edinburg',    zip: '78539–78542', landmark: 'from UTRGV campus to north Edinburg' },
  'mission':     { name: 'Mission',     zip: '78572–78574', landmark: 'including Sharyland and east Mission' },
  'pharr':       { name: 'Pharr',       zip: '78577',       landmark: 'near the Pharr-Reynosa International Bridge' },
  'weslaco':     { name: 'Weslaco',     zip: '78596',       landmark: 'including areas near Estero Llano Grande' },
  'harlingen':   { name: 'Harlingen',   zip: '78550–78552', landmark: 'from downtown to the Stuart Place area' },
  'brownsville': { name: 'Brownsville', zip: '78520–78526', landmark: 'near Gladys Porter Zoo and the Port of Brownsville' },
  'san-benito':  { name: 'San Benito',  zip: '78586',       landmark: 'throughout the Resaca City area' },
};

// ── Service definitions ───────────────────────────────────────────────────────
interface ServiceContent {
  headline: string;
  subheadline: string;
  intro: (cityName: string, landmark: string, zip: string) => string;
  benefits: string[];
  process: { step: string; desc: string }[];
  faqs: (cityName: string) => { q: string; a: string }[];
  cta: string;
  urgency?: string;
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'ac-repair': {
    headline: 'AC Repair',
    subheadline: 'Fast Diagnostics. Same-Day Repairs.',
    intro: (city, landmark, zip) =>
      `When your AC breaks down in ${city}, every minute counts. With temperatures regularly exceeding 100°F in South Texas, a failed air conditioner isn't just uncomfortable — it's a health risk. Imperial Air LLC provides rapid AC repair services across ${city} (ZIP codes ${zip}), ${landmark}. Our fully-stocked service vehicles carry the most common parts so we can fix most repairs on the first visit.`,
    benefits: [
      '2-hour emergency response in most cases',
      'All major brands serviced — Carrier, Trane, Lennox, York, Rheem, Daikin',
      'Upfront pricing before any work begins',
      'Same-day service available for urgent failures',
      'No surprise fees — flat-rate diagnostics',
      'Licensed TX HVAC technicians (TACLA 111452C)',
    ],
    process: [
      { step: 'Call or Book Online', desc: 'Reach us 24/7. We confirm your appointment and dispatch a technician fast.' },
      { step: 'On-Site Diagnosis', desc: 'Our tech runs a full system diagnostic and identifies the root cause — not just symptoms.' },
      { step: 'Upfront Quote', desc: 'You get a clear price before any repair starts. No surprises.' },
      { step: 'Same-Day Repair', desc: 'Most repairs are completed on the first visit with parts from our stocked van.' },
      { step: 'System Test & Guarantee', desc: 'We test the full system before leaving and back our work with a warranty.' },
    ],
    faqs: (city) => [
      {
        q: `How fast can you respond to an AC emergency in ${city}?`,
        a: `For emergency AC repairs in ${city}, we target a 2-hour response time. We operate 24/7 including nights, weekends, and holidays. Contract clients receive priority dispatch.`,
      },
      {
        q: 'How much does AC repair cost in the Rio Grande Valley?',
        a: 'Most residential AC repairs range from $150–$650 depending on the issue. We provide a full diagnostic and upfront quote before starting any work. Common repairs like capacitor replacements or refrigerant recharges are typically on the lower end.',
      },
      {
        q: 'My AC is blowing warm air — what could it be?',
        a: 'Warm air is usually caused by low refrigerant (a leak), a failed capacitor, a dirty condenser coil, or a compressor issue. In South Texas heat, condenser coils get clogged with RGV dust very quickly. Our tech will diagnose the exact cause on-site.',
      },
      {
        q: `Do you repair commercial AC systems in ${city}?`,
        a: `Yes. We repair commercial split systems, rooftop units (RTUs), and large chiller systems for ${city} businesses. Commercial repairs receive priority scheduling to minimize business downtime.`,
      },
    ],
    cta: 'Call for Emergency AC Repair',
    urgency: '🚨 AC Down? Call Now — 2-Hour Response',
  },

  'ac-installation': {
    headline: 'AC Installation',
    subheadline: 'Right-Sized Systems. RGV-Ready.',
    intro: (city, landmark, zip) =>
      `Installing a new air conditioning system in ${city} isn't the same as installing one in Dallas or Houston. The RGV's extreme heat, high humidity, and blowing dust require systems that are properly sized, sealed, and configured for our climate. Imperial Air LLC handles new AC installations across ${city} (ZIP ${zip}), ${landmark}. We size every system using Manual J load calculations — not guesswork — so your new system runs efficiently from day one.`,
    benefits: [
      'Manual J load calculation on every installation — no oversizing or undersizing',
      'All major brands available — Carrier, Trane, Lennox, Rheem, Daikin, York',
      'High-SEER systems that cut energy bills in South Texas heat',
      'Full ductwork inspection with every new install',
      'Permit-ready installations that meet local building codes',
      'Financing available — 99.9% approval, payments from $75/month',
    ],
    process: [
      { step: 'Free In-Home Assessment', desc: 'We measure your space, inspect ductwork, and assess insulation before recommending any system.' },
      { step: 'System Recommendation', desc: 'We present 2–3 options at different price points with honest pros and cons for each.' },
      { step: 'Scheduling & Permits', desc: 'We handle all permit applications. Most installations are scheduled within 3–5 business days.' },
      { step: 'Professional Installation', desc: 'Our licensed techs complete most installations in one day with minimal disruption.' },
      { step: 'Commissioning & Training', desc: 'We test, balance, and commission the system, then walk you through the thermostat and filters.' },
    ],
    faqs: (city) => [
      {
        q: `How much does a new AC system cost in ${city}?`,
        a: 'A new residential system in the RGV typically ranges from $3,500–$8,500 installed depending on system size, brand, and ductwork condition. We offer financing with 99.9% approval and payments starting at $75/month.',
      },
      {
        q: 'How long does AC installation take?',
        a: 'Most residential installations are completed in one day (4–8 hours). Large commercial installations may take 1–3 days. We give you a firm timeline before scheduling.',
      },
      {
        q: 'What size AC do I need for my home?',
        a: 'Size depends on your square footage, insulation, ceiling height, window count, and sun exposure. We use Manual J calculations — the industry standard — to determine the right size. Oversized systems short-cycle and leave your home humid in South Texas.',
      },
      {
        q: `Do you install commercial AC systems in ${city}?`,
        a: `Yes. We install commercial split systems, packaged units, and rooftop units (RTUs) for ${city} businesses of all sizes. We provide project quotes and can work around your business hours.`,
      },
    ],
    cta: 'Get a Free Installation Quote',
  },

  'commercial-hvac': {
    headline: 'Commercial HVAC',
    subheadline: 'Contracts. Maintenance. Zero Downtime.',
    intro: (city, landmark, zip) =>
      `Commercial HVAC failures in ${city} don't just cause discomfort — they close businesses, void leases, and cost thousands per day in lost productivity. Imperial Air LLC provides commercial HVAC services to businesses across ${city} (ZIP ${zip}), ${landmark}. From preventative maintenance contracts to emergency rooftop unit repairs, we keep ${city} businesses running cool year-round.`,
    benefits: [
      'Preventative maintenance contracts — quarterly, bi-annual, or custom schedules',
      'Rooftop unit (RTU) repair, replacement, and installation',
      'Chiller and large system service',
      '$0 emergency service fees for contract clients',
      'Priority dispatch — contract clients jump the queue',
      'Detailed asset health reporting for facility managers',
    ],
    process: [
      { step: 'Free Site Evaluation', desc: 'We assess all HVAC equipment, document your asset inventory, and identify risks.' },
      { step: 'Custom Proposal', desc: 'You receive a detailed contract proposal with service frequency, scope, and pricing.' },
      { step: 'Contract Activation', desc: 'Your facility is added to our maintenance calendar with scheduled service dates confirmed.' },
      { step: 'Ongoing Service', desc: 'Our commercial techs perform all scheduled visits and file detailed reports after each.' },
      { step: 'Emergency Coverage', desc: '24/7 emergency response with priority dispatch for all contract properties.' },
    ],
    faqs: (city) => [
      {
        q: `What types of commercial buildings do you service in ${city}?`,
        a: `We service retail centers, office buildings, restaurants, medical offices, warehouses, schools, and multi-family properties throughout ${city} and the surrounding RGV.`,
      },
      {
        q: 'What does a commercial maintenance contract include?',
        a: 'Contracts include scheduled inspections, filter and belt replacements, coil cleaning, refrigerant checks, electrical component testing, and detailed service reports. Contract scope is customized to your facility size and equipment.',
      },
      {
        q: `How quickly do you respond to commercial emergencies in ${city}?`,
        a: `Contract clients in ${city} receive priority dispatch — we target a 2-hour response for critical failures. Non-contract commercial clients receive same-day service in most cases.`,
      },
      {
        q: 'Do you work with property managers and facilities teams?',
        a: 'Yes. We specialize in long-term partnerships with commercial property managers. We provide asset tracking, scheduled maintenance calendars, and budget forecasting reports to simplify HVAC portfolio management.',
      },
    ],
    cta: 'Request a Commercial Proposal',
  },

  'emergency': {
    headline: '24/7 Emergency AC Repair',
    subheadline: '2-Hour Response. No Service Fees.',
    intro: (city, landmark, zip) =>
      `HVAC emergencies in ${city} don't wait for business hours — and neither do we. Imperial Air LLC provides 24/7 emergency AC and heating repair across ${city} (ZIP ${zip}), ${landmark}. Whether it's 2pm or 2am, our on-call technicians are dispatched fast to get your system running. Contract clients pay $0 in service fees, day or night.`,
    benefits: [
      '24/7/365 availability including holidays',
      '2-hour response target for all of ${city}',
      '$0 service fees for contract clients after hours',
      'Fully stocked vans — most repairs completed same visit',
      'Commercial priority dispatch available',
      'No extra charges for nights, weekends, or holidays (contracts)',
    ],
    process: [
      { step: 'Call 24/7', desc: 'Reach a live Imperial Air team member any time — day or night.' },
      { step: 'Immediate Dispatch', desc: 'We dispatch the nearest available technician to your location right away.' },
      { step: 'Rapid Diagnosis', desc: 'Our tech identifies the problem fast and explains what\'s needed before starting.' },
      { step: 'Emergency Repair', desc: 'Most emergency repairs are completed on the first visit from our stocked service van.' },
      { step: 'Follow-Up', desc: 'We confirm the system is stable and schedule any follow-up work needed.' },
    ],
    faqs: (city) => [
      {
        q: `Is there an extra charge for after-hours emergency calls in ${city}?`,
        a: `Contract clients pay $0 service fees 24/7/365 — no after-hours surcharges. Non-contract clients pay a standard emergency service fee. Contact us for current rates.`,
      },
      {
        q: 'What counts as an HVAC emergency?',
        a: 'Any complete system failure during extreme heat, a system blowing warm air when temperatures exceed 95°F, burning smells or unusual noises, refrigerant leaks, or any failure at a commercial facility impacting business operations.',
      },
      {
        q: `How fast can you reach me in ${city} after hours?`,
        a: `We target a 2-hour response across all of ${city}. Response times may vary slightly based on current call volume, but we'll give you an honest ETA when you call.`,
      },
      {
        q: 'Do you handle commercial emergency HVAC calls?',
        a: 'Yes. Commercial emergency calls receive priority dispatch. We understand that a failed HVAC system at a restaurant, medical office, or retail center is a business-critical situation.',
      },
    ],
    cta: '🚨 Call Now — Emergency Response',
    urgency: '🚨 HVAC Emergency? We Answer 24/7',
  },
};

// ── Related service links shown at bottom ───────────────────────────────────
const OTHER_SERVICES = [
  { slug: 'ac-repair',        label: 'AC Repair' },
  { slug: 'ac-installation',  label: 'AC Installation' },
  { slug: 'commercial-hvac',  label: 'Commercial HVAC' },
  { slug: 'emergency',        label: '24/7 Emergency' },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function CityServicePage() {
  const { city, service } = useParams<{ city: string; service: string }>();
  const navigate = useNavigate();

  const cityInfo = CITY_INFO[city?.toLowerCase() || ''];
  const content = SERVICE_CONTENT[service?.toLowerCase() || ''];

  // 404 fallback if city or service not found
  if (!cityInfo || !content) {
    return (
      <div className="pt-40 text-center space-y-6 px-6">
        <h1 className="text-4xl font-black text-brand-dark">Page Not Found</h1>
        <p className="text-brand-gray">We couldn't find that service page.</p>
        <button onClick={() => navigate('/areas')} className="btn-primary">
          View Service Areas
        </button>
      </div>
    );
  }

  const { name: cityName, zip, landmark } = cityInfo;
  const pageTitle = `${content.headline} in ${cityName}, TX`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageTitle,
    "provider": {
      "@type": "HVACBusiness",
      "name": "Imperial Air LLC",
      "telephone": PHONE_NUMBER,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": content.faqs(cityName).map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  };

  return (
    <div className="pt-32">
      <SchemaMarkup data={schema} />

      {/* Urgency bar — only for emergency/ac-repair */}
      {content.urgency && (
        <div className="bg-red-600 text-white text-center py-3 text-sm font-black tracking-wide">
          {content.urgency} —{' '}
          <a href={`tel:${PHONE_NUMBER}`} className="underline">
            {PHONE_NUMBER}
          </a>
        </div>
      )}

      {/* Hero */}
      <div className="bg-brand-dark text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate(`/areas/${city}`)}
            className="flex items-center gap-2 text-white/50 hover:text-brand-orange font-bold text-sm uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to {cityName}
          </button>
          <div className="max-w-3xl space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-widest text-sm">
              Imperial Air LLC — {cityName}, TX
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight">
              {pageTitle}
            </h1>
            <p className="text-xl text-white/70 font-medium">{content.subheadline}</p>
            <p className="text-white/60 leading-relaxed max-w-2xl">
              {content.intro(cityName, landmark, zip)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-lg px-8 py-4">
              <Phone size={20} />
              {content.cta}
            </a>
            <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
              Request a Quote
            </Link>
          </div>
          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 pt-6 text-sm text-white/50 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Clock size={14} className="text-brand-orange" /> 2-Hr Response</span>
            <span className="flex items-center gap-2"><Shield size={14} className="text-brand-orange" /> Licensed TACLA 111452C</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-brand-orange" /> 5.0 Rating</span>
            <span className="flex items-center gap-2"><Zap size={14} className="text-brand-orange" /> 24/7 Available</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight text-center">
            Why {cityName} Chooses Imperial Air
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-brand-dark font-medium text-sm leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {content.process.map((step, i) => (
              <div key={i} className="relative text-center space-y-3 p-6">
                <div className="w-12 h-12 rounded-full bg-brand-orange text-white font-black text-lg flex items-center justify-center mx-auto">
                  {i + 1}
                </div>
                <h3 className="font-black text-brand-dark text-sm uppercase tracking-tight">{step.step}</h3>
                <p className="text-brand-gray text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-12 bg-brand-dark text-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center">
            {content.headline} FAQ — {cityName}, TX
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {content.faqs(cityName).map((faq, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-brand-orange font-black leading-tight">{faq.q}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 md:px-12 bg-brand-orange">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Ready for {content.headline} in {cityName}?
          </h2>
          <p className="text-white/90 text-lg">
            Call us now or request a quote online. We serve all of {cityName} (ZIP {zip}).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${PHONE_NUMBER}`} className="bg-white text-brand-orange font-black px-8 py-4 rounded-xl text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              <Phone size={20} />
              Call {PHONE_NUMBER}
            </a>
            <Link to="/contact" className="border-2 border-white text-white font-black px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors text-center">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight text-center">
            More Services in {cityName}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {OTHER_SERVICES.filter(s => s.slug !== service).map(s => (
              <Link
                key={s.slug}
                to={`/areas/${city}/${s.slug}`}
                className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors shadow-sm"
              >
                {s.label} in {cityName}
              </Link>
            ))}
            <Link
              to={`/areas/${city}`}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors shadow-sm"
            >
              All {cityName} Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}