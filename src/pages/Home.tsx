import React from 'react';
import Hero from '@/src/components/Hero';
import ServiceSegmentation from '@/src/components/ServiceSegmentation';
import EmergencyBanner from '@/src/components/EmergencyBanner';
import TrustProof from '@/src/components/TrustProof';
import WhyChooseUs from '@/src/components/WhyChooseUs';
import CommercialServicesGrid from '@/src/components/CommercialServicesGrid';
import ProjectShowcase from '../components/ProjectShowcase';
import FAQAccordion from '@/src/components/FAQAccordion';
import SecondaryCTA from '@/src/components/SecondaryCTA';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="bg-red-500 p-10 text-white text-center font-bold">PROJECT SHOWCASE TEST</div>
      <ProjectShowcase />
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
