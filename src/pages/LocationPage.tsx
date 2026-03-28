import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Star, ArrowLeft } from 'lucide-react';
import { PHONE_NUMBER } from '@/src/constants';

export default function LocationPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  
  const isRGV = !city;
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "Rio Grande Valley";
  const displayLocation = isRGV ? cityName : `${cityName}, TX`;
  const callButtonText = isRGV ? "Call RGV Service" : `Call ${cityName} Service`;

  return (
    <div className="pt-24">
      <div className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
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
            Commercial HVAC in {isRGV && "the "}<span className="text-brand-orange">{displayLocation}</span>
          </h1>
          <p className="text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Imperial Air LLC provides top-tier commercial HVAC services to businesses and facilities throughout {isRGV ? "the entire Rio Grande Valley" : `${cityName} and the surrounding Rio Grande Valley`}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={`tel:${PHONE_NUMBER}`} className="btn-primary text-xl px-10 py-5">
              <Phone size={24} />
              {callButtonText}
            </a>
            <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
              <Star className="text-yellow-500" fill="currentColor" size={20} />
              <span className="font-black text-brand-dark">4.9/5 Local Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-brand-dark">Serving {isRGV ? "the RGV's" : `${cityName}'s`} Commercial Community</h2>
          <p className="text-lg text-brand-gray leading-relaxed">
            From retail centers on main street to industrial warehouses and office complexes, we are the trusted HVAC partner for {isRGV ? "Rio Grande Valley" : cityName} business owners. We understand the local climate and the specific demands it puts on commercial cooling systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-2">Local Response</h3>
              <p className="text-brand-gray text-sm">Fast dispatch to all areas of {isRGV ? "the RGV" : cityName}.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-2">Expert Technicians</h3>
              <p className="text-brand-gray text-sm">Licensed and trained for commercial scale.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-gray-200 relative">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }}
            src={isRGV 
              ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d457917.8824143437!2d-98.34960161435546!3d26.2783864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8664536294a2872d%3A0x7d28795555555555!2sRio%20Grande%20Valley%2C%20TX!5e0!3m2!1sen!2sus!4v1711650000000!5m2!1sen!2sus"
              : `https://maps.google.com/maps?q=${encodeURIComponent(cityName + ', TX')}&t=&z=13&ie=UTF8&iwloc=&output=embed`
            }
            allowFullScreen
            title={`Imperial Air ${cityName} Service Area Map`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
