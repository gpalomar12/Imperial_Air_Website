import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import BackToTop from './BackToTop';
import SchemaMarkup from './SchemaMarkup';
import { PHONE_NUMBER, EMAIL, ADDRESS, COMMERCIAL_SERVICES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "Imperial Air LLC",
    "image": "https://imperialair-rgv.com/images/comm_roof_top_unit.jpg",
    "@id": "https://imperialair-rgv.com",
    "url": "https://imperialair-rgv.com",
    "telephone": PHONE_NUMBER,
    "email": EMAIL,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Edinburg",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.3017,
      "longitude": -98.1633
    },
    "areaServed": [
      "Edinburg", "McAllen", "Mission", "Pharr", "Weslaco", "Harlingen", "Brownsville", "Rio Grande Valley"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "HVAC Services",
      "itemListElement": COMMERCIAL_SERVICES.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={businessSchema} />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
      <BackToTop />
    </div>
  );
}
