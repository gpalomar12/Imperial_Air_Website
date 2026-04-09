import React from 'react';
import Hero from '../components/Hero';
import ServiceSegmentation from '../components/ServiceSegmentation';
import EmergencyBanner from '../components/EmergencyBanner';
import TrustProof from '../components/TrustProof';
import WhyChooseUs from '../components/WhyChooseUs';
import CommercialServicesGrid from '../components/CommercialServicesGrid';
import ProjectShowcase from '../components/ProjectShowcase';
import FAQAccordion from '../components/FAQAccordion';
import SecondaryCTA from '../components/SecondaryCTA';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ServiceSegmentation />
      <EmergencyBanner />
      <TrustProof />
      <WhyChooseUs />
      <CommercialServicesGrid />
      <ProjectShowcase />
      <FAQAccordion />
      <SecondaryCTA />
    </div>
  );
}
