import React from 'react';
import Hero from '@/src/components/Hero';
import ServiceSegmentation from '@/src/components/ServiceSegmentation';
import EmergencyBanner from '@/src/components/EmergencyBanner';
import TrustProof from '@/src/components/TrustProof';
import WhyChooseUs from '@/src/components/WhyChooseUs';
import CommercialServicesGrid from '@/src/components/CommercialServicesGrid';
import FAQAccordion from '@/src/components/FAQAccordion';
import SecondaryCTA from '@/src/components/SecondaryCTA';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ServiceSegmentation />
      <EmergencyBanner />
      <TrustProof />
      <WhyChooseUs />
      <CommercialServicesGrid />
      <FAQAccordion />
      <SecondaryCTA />
    </div>
  );
}
