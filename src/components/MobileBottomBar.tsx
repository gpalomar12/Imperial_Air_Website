import React, { useState } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import SiteEvaluationModal from './SiteEvaluationModal';

export default function MobileBottomBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden grid grid-cols-2 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <a 
          href={`tel:${PHONE_NUMBER}`} 
          className="flex flex-col items-center justify-center py-3 bg-brand-orange text-white font-bold gap-1 active:bg-orange-600"
        >
          <Phone size={20} />
          <span className="text-xs">Call Now</span>
        </a>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center py-3 bg-brand-dark text-white font-bold gap-1 active:bg-black"
        >
          <Calendar size={20} />
          <span className="text-xs">Book Now</span>
        </button>
      </div>

      <SiteEvaluationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="commercial"
        initialService="General Commercial"
      />
    </>
  );
}
