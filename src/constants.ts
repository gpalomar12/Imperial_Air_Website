import { 
  Wrench, 
  Building2, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ThermometerSnowflake,
  Fan,
  Settings
} from 'lucide-react';

export const PHONE_NUMBER = "956-566-3406";
export const EMAIL = "info@imperialair-rgv.com";
export const ADDRESS = "Edinburg, TX";

export const VALUE_PROPS = {
  WARRANTY: {
    title: "Platinum Warranty",
    description: "Industry-leading multi-year coverage on parts and labor for elite systems.",
    highlight: "Peace of Mind Guaranteed"
  },
  FINANCING: {
    title: "99.9% Approval",
    description: "Streamlined application process with rapid approvals to fit any budget.",
    highlight: "Buy Now, Pay Later"
  },
  EMERGENCY: {
    title: "24/7 No-Fee Service",
    description: "Round-the-clock emergency support with $0 service fees for contract clients.",
    highlight: "Always Available"
  }
};

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  longDescription: string;
  benefits: string[];
  solutions: string[];
  image: string;
}

export const COMMERCIAL_SERVICES: ServiceDetail[] = [
  {
    id: 'maintenance',
    title: 'Preventative Maintenance',
    description: 'Customized plans to prevent failures and extend equipment life.',
    icon: 'ShieldCheck',
    path: '/services/maintenance',
    longDescription: 'Imperial Air provides comprehensive preventative maintenance programs designed specifically for commercial facilities. Our proactive approach identifies potential issues before they become costly failures, ensuring your business operations remain uninterrupted.',
    benefits: [
      'Extended equipment lifespan',
      'Reduced energy consumption (up to 20%)',
      'Priority emergency response',
      'Detailed asset health reporting',
      'Budget predictability for HVAC expenses'
    ],
    solutions: [
      'Quarterly system inspections',
      'Filter and belt replacement programs',
      'Coil cleaning and sanitization',
      'Refrigerant leak detection',
      'Electrical component testing'
    ],
    image: '/images/comm_5.jpg'
  },
  {
    id: 'rtu',
    title: 'Rooftop Units (RTUs)',
    description: 'Expert installation and repair of commercial rooftop HVAC systems.',
    icon: 'Building2',
    path: '/services/rooftop-units',
    longDescription: 'Rooftop units are the backbone of commercial climate control. We specialize in the installation, repair, and optimization of all major RTU brands, ensuring efficient heating and cooling for retail spaces, offices, and warehouses.',
    benefits: [
      'Space-saving roof installation',
      'Zoned climate control capabilities',
      'High-efficiency performance',
      'Easy access for maintenance',
      'Quiet indoor operation'
    ],
    solutions: [
      'New RTU installation and rigging',
      'Compressor and motor repairs',
      'Economizer troubleshooting',
      'VFD installation and programming',
      'Curb adapter customization'
    ],
    image: '/images/comm_unit_crane.jpg'
  },
  {
    id: 'chillers',
    title: 'Chillers & Large Systems',
    description: 'Specialized service for complex commercial cooling infrastructure.',
    icon: 'ThermometerSnowflake',
    path: '/services/chillers',
    longDescription: 'For large-scale facilities, chiller systems provide the necessary cooling capacity. Our technicians are trained in the complexities of water-cooled and air-cooled chillers, cooling towers, and associated pumping systems.',
    benefits: [
      'Massive cooling capacity for large buildings',
      'Precise temperature and humidity control',
      'Long-term operational efficiency',
      'Scalable cooling solutions',
      'Integrated building automation'
    ],
    solutions: [
      'Chiller overhaul and tube cleaning',
      'Cooling tower maintenance',
      'Water treatment coordination',
      'Pump and valve replacement',
      'System balancing and optimization'
    ],
    image: '/images/comm_roof_top_unit_2.jpg'
  },
  {
    id: 'emergency',
    title: 'Emergency Service',
    description: '24/7 rapid response for critical commercial HVAC failures.',
    icon: 'Clock',
    path: '/services/emergency',
    longDescription: 'HVAC failures don\'t happen on a schedule. When critical cooling goes down, your business can suffer. Imperial Air offers 24/7 emergency response to get your systems back online quickly and minimize downtime.',
    benefits: [
      '24/7 availability, including holidays',
      'Rapid dispatch to Edinburg and RGV',
      'Fully stocked service vehicles',
      'Expert diagnostic capabilities',
      'Priority for contract customers'
    ],
    solutions: [
      'Emergency compressor replacement',
      'Critical leak repair',
      'Control system troubleshooting',
      'Temporary cooling solutions',
      'Rapid parts sourcing'
    ],
    image: '/images/comm_unit_crane2.jpg'
  },
  {
    id: 'upgrades',
    title: 'System Upgrades',
    description: 'Modernizing your facility with high-efficiency HVAC technology.',
    icon: 'Zap',
    path: '/services/upgrades',
    longDescription: 'Older HVAC systems can be a drain on your bottom line. We help commercial property owners modernize their facilities with high-efficiency equipment and smart controls that pay for themselves through energy savings.',
    benefits: [
      'Significant utility bill reduction',
      'Improved indoor air quality',
      'Enhanced employee and customer comfort',
      'Compliance with modern energy codes',
      'Increased property value'
    ],
    solutions: [
      'High-efficiency equipment retrofits',
      'Smart thermostat and BAS integration',
      'Ductwork optimization',
      'Indoor air quality (IAQ) upgrades',
      'Rebate and incentive guidance'
    ],
    image: '/images/comm_4.jpg'
  },
  {
    id: 'optimization',
    title: 'Energy Optimization',
    description: 'Reducing operational costs through smart system tuning.',
    icon: 'Settings',
    path: '/services/optimization',
    longDescription: 'Even new systems can be inefficient if not properly tuned. Our energy optimization service looks at your entire HVAC ecosystem to identify waste and implement strategies that lower your operational costs.',
    benefits: [
      'Lowered operational expenses',
      'Reduced carbon footprint',
      'Optimized system performance',
      'Extended equipment life',
      'Better building comfort'
    ],
    solutions: [
      'Energy audits and assessments',
      'System re-commissioning',
      'Air and water balancing',
      'Control logic optimization',
      'Peak load management strategies'
    ],
    image: '/images/digital_thermostat.jpg'
  }
];

export const FAQS = [
  // --- Commercial ---
  {
    question: "Do you offer commercial HVAC maintenance contracts?",
    answer: "Yes. We offer customized preventative maintenance plans designed around your facility's size, equipment type, and operating hours. Plans include scheduled inspections, filter and belt replacements, coil cleaning, refrigerant checks, and detailed reporting. Contact us for a custom proposal."
  },
  {
    question: "What types of commercial properties do you service?",
    answer: "We service a wide range of commercial properties across the Rio Grande Valley including retail centers, office buildings, restaurants, medical offices, warehouses, schools, and multi-family residential complexes."
  },
  {
    question: "How fast is your emergency response time?",
    answer: "We offer 24/7 emergency response with priority dispatch for contract clients. For all commercial critical failures, we target same-day service. Our service vehicles are fully stocked to handle most repairs on the first visit."
  },
  {
    question: "Do you charge extra service fees for after-hours emergency calls?",
    answer: "Contract clients receive $0 service fees around the clock, including nights, weekends, and holidays. Contact us to learn about our maintenance contract options."
  },
  {
    question: "What commercial HVAC brands do you service?",
    answer: "We service all major commercial HVAC brands including Carrier, Trane, Lennox, York, Daikin, Rheem, and more. Our technicians are trained to work on rooftop units (RTUs), chillers, split systems, VRF systems, and building automation controls."
  },
  {
    question: "Can you help our business reduce its energy bills?",
    answer: "Absolutely. Our Energy Optimization service includes full energy audits, system re-commissioning, air and water balancing, smart thermostat and BAS integration, and peak load management strategies. Many clients see a 15–25% reduction in HVAC-related energy costs."
  },
  {
    question: "Do you work with property managers and facilities directors?",
    answer: "Yes — we specialize in building long-term partnerships with commercial property managers and facilities teams. We provide detailed service reports, asset tracking, and scheduled maintenance calendars to make managing your HVAC portfolio simple."
  },
  // --- Residential ---
  {
    question: "Do you also service residential AC units?",
    answer: "Yes. In addition to our commercial work, we service all residential AC systems including central air, mini-splits, and heat pumps. We handle repairs, tune-ups, and full system replacements."
  },
  {
    question: "How often should I service my home AC unit in South Texas?",
    answer: "In the Rio Grande Valley's extreme heat, we recommend a full AC tune-up at least twice per year — once before summer (March/April) and once before winter (October). Regular maintenance extends system life and prevents costly breakdowns during peak season."
  },
  {
    question: "Do you offer financing for new AC systems?",
    answer: "Yes. We offer financing with 99.9% approval rates to help homeowners and businesses get the equipment they need without upfront costs. Ask us about our buy-now, pay-later options when you call."
  },
  // --- General ---
  {
    question: "What areas of the Rio Grande Valley do you serve?",
    answer: "We serve the entire Rio Grande Valley including McAllen, Edinburg, Mission, Pharr, Weslaco, Harlingen, Brownsville, San Benito, and all surrounding communities. Call us to confirm service availability in your area."
  },
  {
    question: "Is Imperial Air LLC licensed and insured?",
    answer: "Yes. Imperial Air LLC is a fully licensed HVAC contractor in the state of Texas (License TACLA 111452C) and carries full liability and workers' compensation insurance for your protection."
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: "Reymundo Trejo",
    company: "Homeowner",
    text: "Fast, professional, and reliable! Imperial Air came through when I needed it most. Great customer service and quality work. Highly recommend to anyone needing HVAC services!",
    rating: 5
  },
  {
    id: '2',
    name: "Billy Chapa",
    company: "Multi-Residential Developer",
    text: "Hector with Imperial is the best. I made the mistake of having another company come out. They never really fixed the issue or told me what the main cause was. Hector had it figured out in a few minutes. Super nice guy and clearly knows his stuff. Wish I called him sooner.",
    rating: 5
  },
  {
    id: '3',
    name: "gabe hy",
    company: "Local Resident",
    text: "Awesome job!! They came and fixed the mess that someone else made!! They got me the size unit I need for my home!! They worked quickly efficiently and if you qualify can get it financed!! That's the best part!!",
    rating: 5
  },
  {
    id: '4',
    name: "Sasha Gill",
    company: "Local Resident",
    text: "Imperial Air Hector was fast! Professional hit it done in less than 5 mins! Highly recommended",
    rating: 5
  }
];
