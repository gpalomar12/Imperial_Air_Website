import React, { useEffect } from 'react';

export default function SEO() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HVACBusiness",
      "name": "Imperial Air LLC",
      "image": "https://imperialair-rgv.com/og-image.jpg",
      "@id": "https://imperialair-rgv.com",
      "url": "https://imperialair-rgv.com",
      "telephone": "956-566-3406",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Edinburg",
        "addressRegion": "TX",
        "postalCode": "",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.3017,
        "longitude": -98.1633
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.facebook.com/imperialairllc"
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "McAllen"
        },
        {
          "@type": "City",
          "name": "Edinburg"
        },
        {
          "@type": "City",
          "name": "Mission"
        },
        {
          "@type": "City",
          "name": "Pharr"
        },
        {
          "@type": "City",
          "name": "Harlingen"
        },
        {
          "@type": "City",
          "name": "Brownsville"
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
