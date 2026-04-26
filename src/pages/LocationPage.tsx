import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Star, ArrowLeft, Sparkles } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import MapComponent from '../components/MapComponent';
import SchemaMarkup from '../components/SchemaMarkup';
import LocationContactForm from '../components/LocationContactForm';
import { Link } from 'react-router-dom';

const CITY_COORDS: Record<string, [number, number]> = {
  'edinburg': [26.3017, -98.1633],
  'mcallen': [26.2034, -98.2300],
  'mission': [26.2159, -98.3253],
  'pharr': [26.1948, -98.1836],
  'weslaco': [26.1595, -97.9908],
  'harlingen': [26.1906, -97.6961],
  'brownsville': [25.9017, -97.4975],
  'san-benito': [26.1306, -97.6311],
};

interface CityContent {
  intro: string;
  services: { title: string; desc: string }[];
  trustTitle: string;
  trustReason: string;
  faqs: { q: string; a: string }[];
}

const CITY_SPECIFIC_CONTENT: Record<string, CityContent> = {
  'edinburg': {
    intro: "Living in Edinburg means braving some of the most intense heat and humidity in the Rio Grande Valley. With temperatures frequently climbing into the triple digits, a functioning AC system isn't just a convenience—it's a necessity for health and safety. Whether you're a student or faculty at the UTRGV Campus or a business owner in the heart of the city, you know that the relentless South Texas sun doesn't take breaks. At Imperial Air, we specialize in keeping Edinburg residents cool and comfortable with fast, reliable HVAC services designed to withstand our unique tropical climate and high humidity levels.",
    services: [
      { title: "Rapid AC Repair", desc: "Extreme heat puts massive strain on AC units. We fix everything from blown compressors to frozen coils, ensuring your home stays a refuge from the Edinburg heat." },
      { title: "High-Efficiency Installation", desc: "We install systems built for the South Texas humidity. Our installations emphasize maximum airflow to combat the heavy dust and allergens common in our RGV air." },
      { title: "Seasonal Tune-ups", desc: "Pre-summer maintenance is vital. We deep-clean your system to remove RGV dust buildup, ensuring your unit runs efficiently when the Edinburg summer hits its peak." }
    ],
    trustTitle: "Why Edinburg Residents Choose Imperial Air",
    trustReason: "We are proud to call Edinburg home. Our team knows this city inside and out, from the historic downtown to the expanding residential neighborhoods near UTRGV. We offer rapid response times because we know a few hours without AC in South Texas is too long. Plus, our technicians are experts in local Edinburg building codes, ensuring every job is done right the first time.",
    faqs: [
      { q: "How quickly can you get to Edinburg for an emergency?", a: "Being based right here in Edinburg, we offer rapid response times. Often we can have a technician at your door within a few hours for emergency AC repairs." },
      { q: "Do you offer AC services near the UTRGV Campus?", a: "Yes! We serve the entire UTRGV area, including student housing and surrounding residential neighborhoods with fast, affordable HVAC solutions." },
      { q: "How does Edinburg's humidity affect my AC system?", a: "Edinburg's high humidity forces your AC to work harder to remove moisture. We provide specialized tuning to ensure your system dehumidifies effectively, preventing mold and discomfort." }
    ]
  },
  'mcallen': {
    intro: "McAllen homeowners understand that survival in the Rio Grande Valley depends on a high performing air conditioning system. When the South Texas sun beats down on the shoppers at La Plaza Mall, the indoor heat can become unbearable in minutes. Our local climate is notorious for high humidity and drifting dust that can choke your HVAC unit. At Imperial Air, we pride ourselves on providing the fast, professional cooling solutions McAllen residents deserve. We ensure your home remains a sanctuary from the relentless tropical heat, keeping your family safe and comfortable all year long.",
    services: [
      { title: "Rapid AC Repair", desc: "We provide immediate diagnostics for failing units. High South Texas humidity often leads to electrical issues or motor failures. Our technicians arrive quickly to restore your comfort." },
      { title: "High Efficiency Installation", desc: "New systems are designed for maximum efficiency. We install units that can handle the heavy dust loads of the RGV. These high end systems keep your air clean and your bills low." },
      { title: "Seasonal Tune-ups", desc: "Preventative care is essential for lasting performance. We deep clean filters and coils to remove accumulated dust. This proactive approach saves you from costly mid summer breakdowns." }
    ],
    trustTitle: "Why McAllen Residents Choose Imperial Air",
    trustReason: "We have built our reputation on reliability and speed. Our team knows the McAllen area intimately, allowing for rapid response times to any neighborhood. We stay strictly compliant with local McAllen building codes, ensuring every installation or repair is safe and efficient. When you choose Imperial Air, you are choosing a neighbor who understands the specific technical needs of McAllen properties.",
    faqs: [
      { q: "How quickly can you get to McAllen for an emergency?", a: "We offer priority dispatch for McAllen residents. In most cases, we can have a certified technician at your location within two hours of your call." },
      { q: "Do you service businesses near La Plaza Mall?", a: "Yes. We provide both residential and commercial HVAC services throughout the McAllen area, including the busy shopping districts near the mall." },
      { q: "How does the RGV dust impact my McAllen AC unit?", a: "The fine dust in our region can clog condensers and reduce airflow. We recommend regular cleaning to prevent these particles from damaging your delicate internal components." }
    ]
  },
  'mission': {
    intro: "Mission residents know that the Rio Grande Valley heat is relentless, especially during the long summer months. From the beautiful homes in Sharyland to the bustling businesses across the city, reliable air conditioning is a cornerstone of daily life. The combination of intense South Texas sun and high humidity levels can push even the best HVAC systems to their limit. At Imperial Air, we understand these local challenges. We provide specialized cooling services designed to handle the unique climate of Mission, ensuring your home or business stays comfortable no matter how high the mercury rises.",
    services: [
      { title: "Rapid AC Repair", desc: "We handle everything from refrigerant leaks to electrical failures caused by the extreme Mission heat. Our team restores your cooling fast with expert diagnostics." },
      { title: "High-Efficiency Installation", desc: "We install systems optimized for the South Texas humidity and RGV dust. These top-tier installations offer superior dehumidification for your Mission property." },
      { title: "Seasonal Tune-ups", desc: "Prevent breakdowns with our thorough maintenance. We clean coils and check all vital components to ensure your system survives the peak Mission summer demand." }
    ],
    trustTitle: "Why Mission Residents Choose Imperial Air",
    trustReason: "We are deeply committed to serving the Mission community with integrity and speed. Whether you are in the Sharyland area or closer to downtown, our technicians can reach you quickly for any HVAC emergency. We possess extensive knowledge of local Mission building codes and residential requirements, ensuring every installation is safe and compliant. Our neighborly approach combined with professional expertise makes us the first choice for Mission homeowners seeking reliable AC services.",
    faqs: [
      { q: "How quickly can you get to Mission for an emergency?", a: "We offer rapid response times for all of Mission. Usually, we can have a technician at your property within a few hours to diagnose and fix your AC issue." },
      { q: "Do you provide AC services in Sharyland?", a: "Absolutely. We frequently serve the Sharyland neighborhood and are very familiar with the specific HVAC needs of the modern systems often found in that area." },
      { q: "How does South Texas humidity affect my Mission AC?", a: "High humidity makes your AC work harder to keep you cool. We offer specialized maintenance to ensure your system is perfectly tuned to remove excess moisture and prevent mold." }
    ]
  },
  'pharr': {
    intro: "Pharr residents are no strangers to the intense tropical heat that defines the Rio Grande Valley. Whether you are living near the bustling Pharr-Reynosa International Bridge or in a quiet neighborhood, a reliable air conditioning system is vital. The South Texas climate brings extreme temperatures and heavy humidity that can overwhelm standard AC units. At Imperial Air, we offer specialized HVAC solutions tailored for Pharr homeowners. Our services are designed to combat the local dust and moisture that often lead to system failures, ensuring your home remains a cool sanctuary throughout the hottest months of the year.",
    services: [
      { title: "Rapid AC Repair", desc: "We provide expert diagnostics for all AC brands. The Pharr heat puts massive strain on compressors and motors. We respond quickly to restore your cooling and prevent further damage to your unit." },
      { title: "High Efficiency Installation", desc: "New systems are essential for managing South Texas humidity. We install high end units that provide superior airflow and filtration, effectively handling the dust and allergens common in the RGV." },
      { title: "Seasonal Tune-ups", desc: "Proactive maintenance is the best way to avoid emergency failures. We deep clean systems to remove accumulated RGV dust, ensuring your AC operates at peak efficiency even during triple digit heat." }
    ],
    trustTitle: "Why Pharr Residents Choose Imperial Air",
    trustReason: "We have established ourselves as the go to HVAC partner in Pharr through consistent reliability and fast response times. Our team has deep knowledge of local Pharr building codes and residential standards, allowing us to perform every job with precision. We understand that an AC failure in the RGV is an emergency. That is why we prioritize Pharr homeowners, delivering professional service with a neighborly touch that ensures your complete comfort and peace of mind.",
    faqs: [
      { q: "How quickly can you get to Pharr for an emergency?", a: "We offer some of the fastest response times in Pharr. In most cases, our technicians can be at your door within two hours of your service request." },
      { q: "Are you familiar with Pharr building codes?", a: "Yes. Our team is fully licensed and keeps up to date with the specific building and mechanical codes in Pharr to ensure all installations meet safety standards." },
      { q: "Does the Pharr humidity affect my AC performance?", a: "Absolutely. High humidity requires your AC to work harder to remove moisture. We provide specialized tuning to maximize dehumidification and improve your indoor air quality." }
    ]
  },
  'weslaco': {
    intro: "Weslaco residents understand the importance of a high performing air conditioning system in the heart of the Rio Grande Valley. Whether you are exploring the natural beauty of Estero Llano Grande State Park or relaxing in your own backyard, the tropical South Texas climate can be unforgiving. High temperatures and heavy humidity are constant challenges for any HVAC unit. At Imperial Air, we specialize in providing Weslaco homeowners with reliable cooling solutions that stand up to our local environment. We focus on efficiency and dependability, ensuring your family stays comfortable even during the peak of summer.",
    services: [
      { title: "Rapid AC Repair", desc: "The intense Weslaco heat can cause systems to fail without warning. We offer immediate diagnostics and repairs for all major brands. Our goal is to restore your indoor comfort as quickly as possible." },
      { title: "High Efficiency Installation", desc: "If your old system is struggling with the South Texas humidity, we can install a modern, energy efficient unit. These systems are built to handle the heavy dust and moisture typical of our Weslaco air." },
      { title: "Seasonal Tune-ups", desc: "Regular maintenance is vital for preventing mid summer breakdowns. We deep clean your coils and filters to remove RGV dust, helping your system run smoother and last longer in our demanding climate." }
    ],
    trustTitle: "Why Weslaco Residents Choose Imperial Air",
    trustReason: "We have built our reputation in Weslaco on trust, professionalism, and rapid response times. Our technicians possess a comprehensive understanding of Weslaco building codes and local residential requirements. We treat every home as if it were our own, ensuring that all repairs and installations meet the highest safety standards. When you need local expertise and a neighborly approach, Weslaco residents know they can count on Imperial Air to keep them cool.",
    faqs: [
      { q: "How quickly can you get to Weslaco for an emergency?", a: "We prioritize emergency calls in Weslaco. Typically, we can dispatch a certified technician to your home within a few hours to address any urgent HVAC issues." },
      { q: "Can your systems help with the humidity near Estero Llano Grande?", a: "Yes. Our high efficiency units are specifically selected for their superior dehumidification capabilities, which is essential for homes near the local wetlands and parks." },
      { q: "Do you offer maintenance plans for Weslaco homeowners?", a: "We provide customizable seasonal maintenance plans. These are designed to keep your system clean and efficient, protecting it from the fine RGV dust that often causes premature wear." }
    ]
  },
  'harlingen': {
    intro: "Harlingen residents know that staying cool is a full time job in the Rio Grande Valley. Whether you are visiting the historic Iwo Jima Memorial or heading to work, the intense South Texas heat is a constant companion. Our unique tropical climate brings heavy humidity and fine RGV dust that can quickly degrade even the most robust air conditioning systems. At Imperial Air, we provide the specialized HVAC solutions Harlingen homeowners need to maintain a comfortable, healthy indoor environment. We pride ourselves on fast, professional service that ensures your cooling system can handle whatever the RGV weather throws its way.",
    services: [
      { title: "Rapid AC Repair", desc: "The extreme Harlingen temperatures put immense stress on your HVAC components. We offer fast diagnostics and repairs for all brands. Our team works quickly to restore your comfort and prevent expensive system damage." },
      { title: "High Efficiency Installation", desc: "Modern systems are the best defense against high South Texas humidity. We install top tier, energy efficient units that provide superior dehumidification and filtration for your Harlingen property." },
      { title: "Seasonal Tune-ups", desc: "Regular maintenance is the key to longevity in our harsh climate. We deep clean filters and coils to remove accumulated dust, ensuring your unit runs efficiently when the Harlingen summer is at its peak." }
    ],
    trustTitle: "Why Harlingen Residents Choose Imperial Air",
    trustReason: "We have built a reputation in the Harlingen community based on reliability and technical expertise. Our technicians have a thorough understanding of Harlingen building codes and local residential standards. We offer rapid response times because we know that an AC failure in South Texas is an urgent health and safety issue. When you choose Imperial Air, you are choosing professional quality and neighborly care from a team that truly knows the Harlingen area.",
    faqs: [
      { q: "How quickly can you get to Harlingen for an emergency?", a: "We prioritize Harlingen emergency repairs. In most cases, we can have a certified technician at your door within a few hours of your call to restore your cooling." },
      { q: "Are you familiar with the HVAC needs near the Iwo Jima Memorial area?", a: "Yes. We serve the entire Harlingen area, including neighborhoods near the memorial, providing high quality service to diverse properties across the city." },
      { q: "How does the RGV humidity affect my Harlingen AC unit?", a: "Heavy humidity forces your AC to work much harder. We provide specialized tuning to maximize your system's dehumidification power, helping prevent mold and ensuring your home stays truly comfortable." }
    ]
  },
  'brownsville': {
    intro: "Brownsville residents know that the coastal South Texas climate brings a unique set of challenges for any air conditioning system. Whether you are living near the Gladys Porter Zoo or closer to the Port of Brownsville, the heavy sea air and intense Rio Grande Valley sun can quickly wear down your HVAC unit. High humidity and blowing dust require a system that is perfectly tuned and regularly maintained. At Imperial Air, we offer specialized cooling services designed for the Brownsville area. We focus on providing fast, reliable solutions that ensure your home stays a cool sanctuary no matter how high the coastal humidity climbs.",
    services: [
      { title: "Rapid AC Repair", desc: "Our team provides expert diagnostics for all major AC brands. The Brownsville heat and humidity put massive strain on your system. We respond quickly to restore your cooling and prevent expensive component failures." },
      { title: "High Efficiency Installation", desc: "Managing the Brownsville humidity requires a modern, high efficiency system. We install units that offer superior moisture removal and filtration, effectively handling the dust and sea salt common in our region." },
      { title: "Seasonal Tune-ups", desc: "Preventative maintenance is essential for avoiding mid summer breakdowns. We deep clean your system to remove accumulated RGV dust, helping your AC operate at peak efficiency even during triple digit heat waves." }
    ],
    trustTitle: "Why Brownsville Residents Choose Imperial Air",
    trustReason: "We have built our reputation in Brownsville on reliability and local expertise. Our technicians possess a deep understanding of Brownsville building codes and residential standards, allowing us to perform every job with precision. We know that an AC failure in South Texas is an emergency. That is why we prioritize Brownsville homeowners, delivering professional service with a neighborly touch that ensures your complete comfort and peace of mind.",
    faqs: [
      { q: "How quickly can you get to Brownsville for an emergency?", a: "We offer priority response times for all Brownsville residents. In most cases, we can have a certified technician at your location within a few hours to restore your indoor comfort." },
      { q: "Do you provide AC services near the Gladys Porter Zoo?", a: "Yes. We serve the entire Brownsville area, including neighborhoods near the zoo and downtown, providing high quality HVAC solutions for all types of homes." },
      { q: "Does the Brownsville humidity affect my AC performance?", a: "High coastal humidity forces your AC to work harder to remove moisture. We provide specialized tuning to maximize dehumidification and keep your indoor air quality at its best." }
    ]
  },
  'san-benito': {
    intro: "San Benito residents understand that the Resaca City lifestyle requires a cooling system that never quits. Whether you are living near the historic downtown or in the expanding residential areas, the humid Rio Grande Valley climate puts extreme pressure on your air conditioning. High temperatures and fine RGV dust can quickly lead to system inefficiencies and unexpected breakdowns. At Imperial Air, we specialize in providing San Benito homeowners with robust HVAC services that are built to handle the unique demands of our tropical environment. We focus on rapid response and professional quality, ensuring your home remains a cool haven for your family year after year.",
    services: [
      { title: "Rapid AC Repair", desc: "The intense San Benito heat can push electrical components and motors to their limit. We provide fast, accurate diagnostics and repairs for all major HVAC brands. Our priority is restoring your indoor comfort quickly." },
      { title: "High Efficiency Installation", desc: "Combatting the South Texas humidity requires a modern, high efficiency system. We install top tier units that feature advanced dehumidification and filtration, designed specifically for the humid San Benito air." },
      { title: "Seasonal Tune-ups", desc: "Regular maintenance is the most effective way to prevent costly mid summer failures. We thoroughly clean your coils and filters to remove RGV dust, ensuring your system runs smoothly even during peak demand." }
    ],
    trustTitle: "Why San Benito Residents Choose Imperial Air",
    trustReason: "We have built our reputation in San Benito on reliability, integrity, and local knowledge. Our technicians are fully versed in San Benito building codes and residential standards, ensuring every job is performed safely and correctly. We understand that an AC failure in the RGV is an emergency. That is why we offer fast response times and professional expertise with a neighborly touch. San Benito residents trust Imperial Air to keep their homes comfortable and their HVAC systems running at peak performance.",
    faqs: [
      { q: "How quickly can you get to San Benito for an emergency?", a: "We offer priority scheduling for all San Benito residents. We aim to have a certified technician at your door within a few hours of your call to address any urgent HVAC needs." },
      { q: "Are your technicians familiar with San Benito building codes?", a: "Yes. Our team is fully licensed and keeps up to date with the specific mechanical and building codes in San Benito to ensure every installation meets safety requirements." },
      { q: "How does the San Benito humidity impact my AC?", a: "Heavy humidity forces your AC to work harder to maintain comfort. We provide specialized tuning to maximize your system's dehumidification capability, helping to prevent mold and ensure a healthy indoor environment." }
    ]
  }
};

export default function LocationPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  
  const isRGV = !city;
  const cityKey = city?.toLowerCase() || '';
  const specificContent = CITY_SPECIFIC_CONTENT[cityKey];
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "Rio Grande Valley";
  const displayLocation = isRGV ? cityName : `${cityName}, TX`;
  const callButtonText = isRGV ? "Call RGV Service" : `Call ${cityName} Service`;

  // Content for H1
  const h1Text = cityKey === 'edinburg' 
    ? "Fast & Reliable AC Repair & HVAC Experts in Edinburg, TX"
    : cityKey === 'mcallen'
    ? "Expert AC Repair & HVAC Services in McAllen, TX"
    : cityKey === 'mission'
    ? "Fast & Reliable AC Repair & HVAC Experts in Mission, TX"
    : cityKey === 'pharr'
    ? "Fast & Reliable AC Repair in Pharr, TX"
    : cityKey === 'weslaco'
    ? "Fast & Reliable AC Repair in Weslaco, TX"
    : cityKey === 'harlingen'
    ? "Fast & Reliable AC Repair in Harlingen, TX"
    : cityKey === 'brownsville'
    ? "Fast & Reliable AC Repair in Brownsville, TX"
    : cityKey === 'san-benito'
    ? "Fast & Reliable AC Repair in San Benito, TX"
    : `Commercial & Residential HVAC in ${isRGV ? "the " : ""}${displayLocation}`;

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": `Imperial Air LLC - ${cityName}`,
    "description": specificContent?.intro || `Professional commercial and residential HVAC services in ${displayLocation}. Expert repairs and maintenance.`,
    "url": window.location.href,
    "telephone": PHONE_NUMBER,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "geo": city ? {
      "@type": "GeoCoordinates",
      "latitude": CITY_COORDS[city.toLowerCase()]?.[0],
      "longitude": CITY_COORDS[city.toLowerCase()]?.[1]
    } : undefined,
    "areaServed": {
      "@type": city ? "City" : "AdministrativeArea",
      "name": cityName
    },
    "mainEntity": specificContent ? {
      "@type": "FAQPage",
      "mainEntity": specificContent.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    } : undefined
  };

  return (
    <div className="pt-32">
      <SchemaMarkup data={locationSchema} />
      <div className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-gray hover:text-brand-orange font-bold uppercase tracking-widest text-sm transition-colors group mb-12"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Service Areas
          </button>

          <div className="max-w-7xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <MapPin size={60} className="text-brand-orange" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tight">
              {h1Text}
            </h1>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
              {specificContent?.intro || `Imperial Air LLC provides top-tier commercial and residential HVAC services to businesses and homeowners throughout ${isRGV ? "the entire Rio Grande Valley" : `${cityName} and the surrounding areas`}.`}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-xl px-10 py-5">
                <Phone size={24} />
                {callButtonText}
              </a>
              <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
                <Star className="text-yellow-500" fill="currentColor" size={20} />
                <span className="font-black text-brand-dark">5/5 Local Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-brand-dark">
              {specificContent ? specificContent.trustTitle : `Serving ${isRGV ? "the RGV's" : `${cityName}'s`} Commercial & Residential Community`}
            </h2>
            <p className="text-lg text-brand-gray leading-relaxed">
              {specificContent ? specificContent.trustReason : `From retail centers and office complexes to residential neighborhoods, we are the trusted HVAC partner for ${isRGV ? "Rio Grande Valley" : cityName} property owners. We understand the South Texas climate and the specific demands it puts on both industrial equipment and home AC units.`}
            </p>

            {isRGV && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {Object.keys(CITY_COORDS).map(c => (
                  <button
                    key={c}
                    onClick={() => navigate(`/areas/${c}`)}
                    className="px-4 py-3 bg-white border border-gray-100 rounded-xl text-brand-dark font-bold text-sm hover:border-brand-orange hover:text-brand-orange transition-all shadow-sm text-center capitalize"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specificContent ? (
                specificContent.services.slice(0, 2).map((service, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-lg mb-2">{service.title}</h3>
                    <p className="text-brand-gray text-sm">{service.desc}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-lg mb-2">Local Response</h3>
                    <p className="text-brand-gray text-sm">Fast dispatch to all areas of {isRGV ? "the RGV" : cityName}.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-lg mb-2">Expert Technicians</h3>
                    <p className="text-brand-gray text-sm">Licensed and trained for commercial scale.</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-gray-200 relative group z-0">
            <MapComponent 
              center={city ? CITY_COORDS[city.toLowerCase()] || [26.3017, -98.1633] : [26.3017, -98.1633]} 
              zoom={isRGV ? 10 : 13}
              cityName={cityName}
              isRGV={isRGV}
            />
          </div>
        </div>

        {specificContent && (
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black text-brand-dark mb-8 text-center">Service Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specificContent.services.map((service, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">{service.title}</h3>
                    <p className="text-brand-gray leading-relaxed">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Service+City Link Grid — adds internal links for SEO */}
            <div className="mt-12 p-8 bg-gray-50 rounded-3xl space-y-4">
              <h3 className="font-black text-brand-dark uppercase tracking-tight text-lg">
                More {cityName} HVAC Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { slug: 'ac-repair',       label: `AC Repair in ${cityName}` },
                  { slug: 'ac-installation', label: `AC Installation in ${cityName}` },
                  { slug: 'commercial-hvac', label: `Commercial HVAC in ${cityName}` },
                  { slug: 'emergency',       label: `24/7 Emergency in ${cityName}` },
                ].map(link => (
                  <Link
                    key={link.slug}
                    to={`/areas/${cityKey}/${link.slug}`}
                    className="text-center px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors shadow-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Contact Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                  <Sparkles size={16} />
                  Free Service Estimates
                </div>
                <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight leading-none">
                  Get Your {cityName} AC Quote Today
                </h2>
                <p className="text-xl text-brand-gray leading-relaxed">
                  Don't let a minor issue turn into a major breakdown. Our {cityName} technicians are ready to provide expert advice and high-quality HVAC solutions at competitive rates.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-dark text-white rounded-lg flex items-center justify-center font-bold">1</div>
                    <p className="font-bold text-lg text-brand-dark">Same-Day Local Response</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-dark text-white rounded-lg flex items-center justify-center font-bold">2</div>
                    <p className="font-bold text-lg text-brand-dark">Expert South Texas Tuning</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-dark text-white rounded-lg flex items-center justify-center font-bold">3</div>
                    <p className="font-bold text-lg text-brand-dark">Platinum Warranty Coverage</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <LocationContactForm cityName={cityName} />
              </div>
            </div>

            <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden honeycomb-bg">
              <div className="relative z-10 space-y-12">
                <div className="text-center">
                  <h2 className="text-4xl font-black uppercase tracking-tight mb-4">{cityName} AC FAQ</h2>
                  <p className="text-white/60">Frequently asked questions about HVAC in our local area.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  {specificContent.faqs.map((faq, i) => (
                    <div key={i} className="space-y-4">
                      <h4 className="text-brand-orange font-bold text-lg leading-tight">{faq.q}</h4>
                      <p className="text-white/80 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
