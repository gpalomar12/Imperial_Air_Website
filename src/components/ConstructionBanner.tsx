import React from 'react';
import { Construction } from 'lucide-react';

export default function ConstructionBanner() {
  return (
    <div className="bg-amber-400 text-black py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium">
      <Construction className="w-4 h-4" />
      <span>SITE UNDER CONSTRUCTION — We are currently updating our services and information.</span>
    </div>
  );
}
