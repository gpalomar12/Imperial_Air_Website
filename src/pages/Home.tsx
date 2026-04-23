import React from 'react';
import Hero from '../components/Hero';
import ServiceSegmentation from '../components/ServiceSegmentation';
import ValueGrid from '../components/ValueGrid';
import EmergencyBanner from '../components/EmergencyBanner';
import TrustProof from '../components/TrustProof';
import WhyChooseUs from '../components/WhyChooseUs';
import SecondaryCTA from '../components/SecondaryCTA';
import SchemaMarkup from '../components/SchemaMarkup';
import { FAQS } from '../constants';

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="overflow-hidden">
      <SchemaMarkup data={faqSchema} />
      <Hero />
      <ValueGrid />
      <ServiceSegmentation />
      <EmergencyBanner />
      <TrustProof />
      <WhyChooseUs />
      <SecondaryCTA />
    </div>
  );
}
